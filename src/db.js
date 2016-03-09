import PouchDB from 'pouchdb'
import PouchDbAuthentication from 'pouchdb-authentication'

PouchDB.plugin(PouchDbAuthentication)

function fullUri({name, uri}){
    return `${uri}/${name}`
}

export default function db(settings){
   return new PouchDB(fullUri(settings), {skipSetup: true})
}
