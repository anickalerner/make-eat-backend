
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {  
        console.log('user connected');
        socket.on('ADDED TO FAVORITES', data => {
            const {recipe, user} = JSON.parse(data);
            console.log('added to favs', recipe.name);
            let creatorChannel = 'user-' + recipe.createdBy._id;
            socket.to(creatorChannel).emit('LIKER ADDED', JSON.stringify(recipe));
        });

        socket.on('USER CHANNEL', userId => {            
            let channelName = 'user-' + userId;
            socket.join(channelName);
            socket.userChannel = channelName;
        })
        socket.on('chat topic', topic => {
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;
        })
        socket.on('chat newMsg', msg => {
            console.log(msg)
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })

    })
}