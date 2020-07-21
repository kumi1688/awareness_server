const socketIO = require('socket.io');

module.exports = (server, app) => {
    const io = socketIO(server)
    const io_network = io.of('/network')
    
    console.log('소켓 연결 시도...')
    io_network.on('connect', socket => {
        
        socket.on('data', data =>{
            console.log(data)
        } );
    })
}