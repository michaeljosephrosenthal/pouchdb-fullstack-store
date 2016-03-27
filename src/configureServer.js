import req from 'requisition'
import initPouchDB  from './db'
import { execSync } from 'child_process'

function catchAndTrace(message, err){
    console.log(message, err)
    console.trace(err)
}

function injectCredentials({uri, protocols=['http', 'https'], admin: {name, password} }){
    let p = protocols.filter(p => uri.startsWith(`${p}://`))[0] + '://'
    return uri.replace(p, `${p}${name}:${password}@`)
}

export function ensureRemoteExistence({uri, name, credentials: {admin} = {}}){
    let endpoint = admin ? injectCredentials({uri: `${uri}/${name}`, admin}) : `${uri}/${name}`
    console.log(execSync(`curl -X PUT ${endpoint}`))
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
        let resp = await this.login(name, password)
        console.log('Server admin logged in')
        return resp
    } catch (err) {
        catchAndTrace('error logging in superadmin', err)
    }
}

async function initUser({name, password}){
    try {
        await this.signup(name, password)
    } catch (err) {
        if(err.status != 409){
            catchAndTrace('error creating superadmin', err)
        } else {
            console.log(`user ${name} already exists`)
        }
    }
}

async function initDbUsers({
    uri, credentials: {admin, users}
}){
    try {
        await createSuperAdmin.bind(this)({ uri, ...admin })
    } catch (err) {
        catchAndTrace('error in initDbUsers', err)
    }
    users.forEach(initUser.bind(this))
}

export default async function configure({
    settings: { db: {uri, credentials} }
}){
    if(credentials)
        initDbUsers.bind(this)({uri, credentials});
}
