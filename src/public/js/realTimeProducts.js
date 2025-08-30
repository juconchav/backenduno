// Conexión con el servidor de Socket.IO
const socket = io();

// Referencia al contenedor de productos y al formulario
const productsContainer = document.getElementById('products-container');
const productForm = document.getElementById('product-form');

// Escucha el evento 'updateProducts' para renderizar
socket.on('updateProducts', (products) => {
    renderProducts(products);
});

// Maneja el envío del formulario
productForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que se recargue la página

    // Captura los datos del formulario
    const productName = document.getElementById('product-name').value;
    const productPrice = parseFloat(document.getElementById('product-price').value);

    // Crea el objeto del producto
    const newProduct = {
        name: productName,
        price: productPrice
    };

    // Emite el evento 'addProduct' al servidor
    socket.emit('addProduct', newProduct);

    // Limpia el formulario
    productForm.reset();
});

// Función para renderizar los productos en la vista
function renderProducts(products) {
    productsContainer.innerHTML = '';
    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.innerHTML = `
            <h3>${product.name}</h3>
            <p>Precio: $${product.price}</p>
        `;
        productsContainer.appendChild(productItem);
    });
}