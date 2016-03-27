import { storePersistencePlugin } from 'strictduck-domain-driven-fullstack'
import domainMiddlewareGenerator from './domainMiddlewareGenerator'
import init from './db'

const provide = ($ES.CONTEXT == 'NODE' ? require('./configureServer') : require('./domainMiddlewareGenerator')).default
const putDb = ($ES.CONTEXT == 'NODE' ? require('./configureServer').ensureRemoteExistence : _ => _)

export default storePersistencePlugin.implement({
    name: 'DomainDrivenPouchPersistencePlugin',
    constructor({ Domains: { settings: { db } } }){
        putDb(db)
        return [{
            db: init(db),
            middlewareGenerator: domainMiddlewareGenerator
        }]
    },
    provider(...args){
        return provide.bind(this.db)(...args)
    }
})
