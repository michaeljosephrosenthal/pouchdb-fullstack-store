import PouchSync from 'pouch-websocket-sync'
    //syncDb({db, name: dbName})
function syncDb({store, db, name}){
    const syncClient = PouchSync.createClient()
    const sync = syncClient.connect('ws://localhost:3001').on(
        'error', function(err) { console.log(err); }
    ).sync(db, {
        remoteName: `${name}-server`,
        credentials: { token: 'some token'}
    })
}

