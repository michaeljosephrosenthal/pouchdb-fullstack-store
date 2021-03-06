import jPath from 'json-path'
import Queue from 'async-function-queue'
import equal from 'deep-equal'
import clone from 'clone'
import { bindActionCreators } from 'redux'

function warn(what) {
    var fn = console.warn || console.log;
    if (fn) {
        fn.call(console, what);
    }
}

function plain(obj){
    return JSON.parse(JSON.stringify(obj))
}

function plainClone(obj){
    return plain(clone(obj))
}

function defaultAction(action) {
    return function() {
        throw new Error('no action provided for ' + action);
    };
}

const defaultActions = {
    remove: defaultAction('remove'),
    update: defaultAction('update'),
    insert: defaultAction('insert')
}


function initFromDb(path) {
    if(!path.lifecycleState){
        path.lifecycleState = 'INITIALIZING'
        return path.db.allDocs({
            include_docs: true,
            ...(path.prefix ? {
                startkey: path.prefix,
                endkey: `${path.prefix}\uffff`
            } : {})
        }).then(result => {
            result.rows.forEach(row => onDbChange(path, row))
            path.lifecycleState = 'INITIALIZED'
            listen(path)
        })
    }
}

function listen(path) {
    var changes = path.db.changes({
        live: true, since: 'now', include_docs: true,
        ...(path.prefix ? {
            filter: ({_id}) => _id.split('/')[0] == path.prefix
            } : {})
    });
    changes.on('change', change => onDbChange(path, change));
}


function processNewStateForPath(path, state) {
    var docsContainer = jPath.resolve(state, path.path);

    /* istanbul ignore else */
    if (docsContainer && docsContainer.length && path.lifecycleState == 'INITIALIZED' ){
        docsContainer.forEach(docs => {
            var {updated, deleted, inserted} = differences(path.docs, docs)
            inserted.concat(updated).forEach(doc => path.insert(doc))
            deleted.forEach(doc => path.remove(doc))
        });
    }
}

class Path {
  constructor({path = '.', prefix = '', db, actions}) {
      if (! db) {
          throw new Error('path ' + path.path + ' needs a db');
      }

      this.queue = Queue(1)
      this.docs = {}

      this.db = db
      this.path = path
      this.prefix = prefix
      this.actions = Object.assign({}, defaultActions, actions)
  }

  insert(doc) {
      this.docs[doc._id] = plainClone(doc)
      var db = this.db
      this.queue.push(cb => {
          db.put(doc, cb)
      })
  }

  remove(doc) {
      var db = this.db
      this.queue.push(cb => {
          db.remove(doc, cb)
          delete this.docs[doc._id]
      })
  }

  wrapActionCreators(dispatch){
      this.propagations = Object.keys(this.actions).reduce(
          (propagations, act) => {
              propagations[act] = doc => {
                  let action = this.actions[act](doc)
                  if(action) dispatch(action)
              }
              return propagations
          }, {}
      )
  }

  initFromDb(){
      initFromDb(this).catch(err => {
          if(err.status == 401){
              this.lifecycleState = false
              this.db.once('login', _ => initFromDb(this))
          } else {
              throw err
          }
      })
  }
}

function differences(oldDocs, newDocs) {
    var inserted = [],
        updated = [],
        deleted = Object.keys(oldDocs).map(oldDocId => oldDocs[oldDocId]);

    newDocs.map(plainClone).forEach(newDoc => {
        if (! newDoc._id) warn('doc with no id');

        deleted = deleted.filter(doc => doc._id !== newDoc._id);

        var oldDoc = oldDocs[newDoc._id];
        if (! oldDoc) {
            inserted.push(newDoc);
        } else if (!equal(oldDoc, newDoc)) {
            updated.push(newDoc);
        }
    });
    return {inserted, updated, deleted}
}

function onDbChange(path, {doc: changeDoc, ...change}) {
    if (changeDoc._deleted) {
        if (path.docs[changeDoc._id]) {
            delete path.docs[changeDoc._id];
            path.propagations.remove(changeDoc);
        }
    } else {
        var oldDoc = path.docs[changeDoc._id];
        path.docs[changeDoc._id] = plainClone(changeDoc);
        if (oldDoc) {
            path.propagations.update(changeDoc);
        } else {
            path.propagations.insert(changeDoc);
        }
    }
}

export default function reduxMiddleware(paths = []) {
    if (!Array.isArray(paths)) 
        paths = [paths];

    if (!paths.length)
        warn('PouchMiddleware: no paths');

    paths = paths.map(options => new Path(options))

    return ({dispatch, getState}) => {
        paths.forEach(path => {
            path.wrapActionCreators(dispatch)
            path.initFromDb()
        })
        return next => action => {
            let nextAction = next(action)
            paths.forEach(path => processNewStateForPath(path, getState()))
            return nextAction
        }
    }
}
