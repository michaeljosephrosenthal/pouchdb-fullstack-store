import db from './db'
import req from 'requisition'

function catchAndTrace(message, err){
    console.log(message, err)
    console.trace(err)
}

async function createSuperAdmin({ uri, name, password }){
    try {
        let resp = await req
            .put(`${uri}/_config/admins/${name}`)
            .send(`"${password}"`)
        console.log('Server admin created')
    } catch (err) {
        if(err.status != 409){
            catchAndTrace('error creating superadmin', err)
        } else {
            console.log('Server admin already exists')
        }
    }

    try {
        let resp = await db.login(name, password)
        console.log('Server admin logged in')
        return resp
    } catch (err) {
        catchAndTrace('error logging in superadmin', err)
    }
}

export async function initDbUsers({
    uri, server, client: {name, password}
}){
    try {
        await createSuperAdmin({ uri, ...server })
    } catch (err) {
        catchAndTrace('error in initDbUsers', err)
    }

    try {
        await db.signup(name, password)
    } catch (err) {
        if(err.status != 409){
            catchAndTrace('error creating superadmin', err)
        } else {
            console.log('Client user already exists')
        }
    }
}
    

export default db
