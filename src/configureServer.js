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
    credentials: {admin, users}
}){
    try {
        await createSuperAdmin({ uri, ...admin })
    } catch (err) {
        catchAndTrace('error in initDbUsers', err)
    }
    users.forEach(initUser)
}

export default async function configure({
    settings: { db: {uri, credentials} }
}){
    if(credentials)
        initDbUsers({credentials});
}
