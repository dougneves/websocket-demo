const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('nova conexao ' + socket.id);
  socket.emit('message', {
    alias: '[server]',
    message: 'Conectado com sucesso'
  });
  socket.on('message', data => {
    console.log(
      `recebi mensagem '${data.message}' com alias ${data.message} do id ${
        socket.id
      }, vou enviar para todos`
    );
    io.sockets.emit('message', data);
  });
});
