const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 80;
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});
// WARNING: app.listen(80) will NOT work here!

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// io.on('connection', (socket) => {
//     socket.emit('news', { from: 'server', text: 'hello client' });
//     socket.on('my other event', (data) => {
//         console.log(data);
//     });
//     // // when server disconnects from user 
//     // socket.on('disconnect', () => {
//     //     console.log('disconnected from user');
//     // });
// });


//Sending and getting data (acknowledgements)
io.on('connection', (socket) => {
  socket.on('ferret', (name, word, fn) => {
    fn(name + ' says ' + word);
  });
});