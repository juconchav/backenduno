const express = require('express');
const router = express.Router();

module.exports = (products) => {

    // Router usa producto como.
    router.get('/home', (req, res) => {
        res.render('home', { products: products });
    });

    router.get('/realtimeproducts', (req, res) => {
        res.render('realTimeProducts');
    });

    return router;
};