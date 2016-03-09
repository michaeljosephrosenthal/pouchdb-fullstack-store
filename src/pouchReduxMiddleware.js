var jPath = require('json-path');
var Queue = require('async-function-queue');
var equal = require('deep-equal');
import { bindActionCreators } from 'reactuate'

function warn(what) {
    var fn = console.warn || console.log;
    if (fn) {
        fn.call(console, what);
    }
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
        path.db.allDocs({
            include_docs: true,
            startkey: path.prefix,
            endkey: `${path.prefix}\uffff`
        }).then(result => {
            result.rows.forEach(row => onDbChange(path, row))
            path.lifecycleState = 'INITIALIZED'
            listen(path)
        }).catch(err => console.log(err))
    }
}

function listen(path) {
    var changes = path.db.changes({
        live: true, since: 'now', include_docs: true,
        filter: ({_id}) => _id.split('/')[0] == path.prefix
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
      this.docs[doc._id] = doc
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

  initFromDb(){ initFromDb(this) }
  
}

function differences(oldDocs, newDocs) {
    var inserted = [],
        updated = [],
        deleted = Object.keys(oldDocs).map(oldDocId => oldDocs[oldDocId]);

    newDocs.forEach(newDoc => {
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
        path.docs[changeDoc._id] = changeDoc;
        if (oldDoc) {
            path.propagations.update(changeDoc);
        } else {
            path.propagations.insert(changeDoc);
        }
    }
}

export default function createPouchMiddleware(paths = []) {
    if (!Array.isArray(paths)) 
        paths = [paths];

    if (!paths.length)
        throw new Error('PouchMiddleware: no paths');

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
