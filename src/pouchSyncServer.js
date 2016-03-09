const http = require('http');
const PouchDB = require('pouchdb');
const PouchSync = require('pouch-websocket-sync');

const server = http.createServer();

const db = new PouchDB('http://localhost:5984/soil');

function onRequest(credentials, dbName, callback) {
    if (dbName == 'soil-server') {
        callback(null, db);
    } else {
        callback(new Error('database not allowed'));
    }
}

const wss = PouchSync.createServer(server, onRequest);

wss.on('error', function(err) {
    console.error(err.stack);
});

server.listen(3001, function() {
    console.log((new Date()) + ' Server is listening on', server.address());
});

