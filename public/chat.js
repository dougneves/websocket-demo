var socket = io.connect('http://localhost:5000');

socket.on('message', data => {
  document.getElementById('output').innerHTML += `<p>${data.alias}: ${
    data.message
  }</p>`;
});

window.addEventListener('load', () => {
  document.getElementById('sendbtn').addEventListener('click', () => {
    const alias = document.getElementById('alias').value;
    const message = document.getElementById('message').value;

    if (!alias || !message) {
      alert('Nome e mensagem obrigatórios');
    }

    console.log(`vou enviar mensagem '${message}' com alias ${alias}`);
    socket.emit('message', { alias, message });
  });
});
