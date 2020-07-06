/**
 * Express initializes app to be a function handler that you can supply to an HTTP server 
 */
const app = require('express')();
const http = require('http').createServer(app);
/**
 * Initialize the new instance of socket.io by passing the http object
 */
const io = require('socket.io')(http);

const PORT = 3000;

/**
 * Route Handler
 */
app.get('/', (req, res) => {
    res.status(200).send('hey, welcome to socket io');
});

/**
 * Listen on the connection and disconnection events for incoming sockets
 */
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disxonnect', () => {
        console.log('user disconnected');
    });
    socket.on('from browser', (msg) => {
        console.log('message: ' + msg);
        io.emit('reply from server', `server: ${msg}`);
      });

});



http.listen(PORT, () => {
    console.log('The application is running in the port - 3000');
});