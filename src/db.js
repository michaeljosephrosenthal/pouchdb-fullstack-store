import PouchDB from 'pouchdb'
import PouchDbAuthentication from 'pouchdb-authentication'
import { db } from '../settings.json'

PouchDB.plugin(PouchDbAuthentication)

function fullUri({name, uri}){
    return `${uri}/${name}`
}

export default new PouchDB(fullUri(db), {skipSetup: true})
