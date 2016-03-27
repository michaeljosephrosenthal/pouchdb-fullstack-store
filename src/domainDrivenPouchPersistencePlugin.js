import { storePersistencePlugin } from 'strictduck-domain-driven-fullstack'

import PouchDB from 'pouchdb'
import PouchDbAuthentication from 'pouchdb-authentication'

PouchDB.plugin(PouchDbAuthentication)

import domainMiddlewareGenerator from './domainMiddlewareGenerator'

const provide = ($ES.CONTEXT == 'NODE' ? require('./configureServer') : require('./domainMiddlewareGenerator')).default

function fullUri({name, uri}){
    return `${uri}/${name}`
}

export default storePersistencePlugin.implement({
    name: 'DomainDrivenPouchPersistencePlugin',
    constructor({ Domains: { settings: { db } } }){
        return [{
            db: new PouchDB(fullUri(db), {skipSetup: true}),
            middlewareGenerator: domainMiddlewareGenerator
        }]
    },
    provider(...args){
        return provide.bind(this.db)(...args)
    }
})
