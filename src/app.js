const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const PORT = 3000;

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Variables de productos - **aquí es donde se centralizan**
let products = [
    { id: 1, name: 'Laptop', price: 1200 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Teclado', price: 75 }
];

//  router se importa y se le pasa la lista de productos
const viewsRouter = require('./routes/views.router')(products);
app.use('/', viewsRouter);

// Habilita servidor HTTP
const server = http.createServer(app);

// Configura Socket.IO
const io = new Server(server);

// Manejo de eventos de Socket.IO
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado!');
    socket.emit('updateProducts', products);

    socket.on('addProduct', (newProduct) => {
        newProduct.id = products.length + 1;
        products.push(newProduct);
        io.emit('updateProducts', products);
    });
});

// Levanta el servidor
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});