import t from 'tcomb'
import { bindActionCreators } from 'reactuate'
import PouchMiddleware from './pouchReduxMiddleware'
import db from './db'

function dbActions({domain: {actions}}){
    let acts = Object.keys(actions)
        .filter(a => ['update', 'insert', 'remove'].indexOf(a) >= 0 )
        .reduce((dbActs, a) => {
            dbActs[a] = doc => {
                try {
                    return actions[a](doc)
                } catch(e) {
                    if(e instanceof TypeError){
                        return
                    } else {
                        throw e
                    }
                }
            }
            return dbActs
        }, {})
    return acts != {} ? acts : false
}

export default function pouchMiddlewareGenerator(domains){
    return PouchMiddleware(
        Object.values(domains).filter(d => dbActions({domain: d}))
        .map( domain => ({
            path: `/${domain.prefix}`,
            prefix: `${domain.dbPrefix}`,
            db,
            actions: dbActions({domain: domain})
        }))
    )
}
