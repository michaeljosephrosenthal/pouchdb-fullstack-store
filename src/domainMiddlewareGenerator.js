import { bindActionCreators } from 'redux'
import reduxMiddleware from './reduxMiddleware'

function invert(obj){
    return Object.keys(obj).reduce(
        (inversion, key) => {
            inversion[obj[key]] = key
            return inversion
        }
    ,{})
}

let defaultActionMap = {insert: 'insert', update: 'update', remove: 'remove'}
function dbActions({domain: {
    actions = {},
    pouchActionMap: actionMap=defaultActionMap
}}){
    let invertedActionMap = invert(actionMap) 
    let acts = Object.keys(actions)
        .filter(a => [actionMap.update, actionMap.insert, actionMap.remove].indexOf(a) >= 0 )
        .reduce((dbActs, a) => {
            dbActs[invertedActionMap[a]] = doc => {
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
    return Object.keys(acts).length ? acts : false
}

export default function domainDrivenReduxMiddleware({db, domains}){
    if($ES.CONTEXT == 'BROWSER'){
        return reduxMiddleware(
            Object.values(domains)
                .filter(domain => dbActions({ domain }))
                .map( domain => ({
                    path: `/${domain.prefix}`,
                    prefix: `${domain.dbPrefix || ''}`,
                    db,
                    actions: dbActions({ domain })
                }))
        )
    } else {
        return _ => next => action => next(action)
    }
}
