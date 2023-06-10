const productController = require('../controllers/productController');
const routes = [
    {
        method: 'GET',
        url: '/api/product',
        handler: productController.getAll
    },
    {
        method: 'GET',
        url: '/api/product/:id',
        handler: productController.getSingle
    },
    {
        method: 'POST',
        url: '/api/product',
        handler: productController.add,
    },
    {
        method: 'PUT',
        url: '/api/product/:id',
        handler: productController.update
    },
    {
        method: 'DELETE',
        url: '/api/product/:id',
        handler: productController.delete
    }
]
module.exports = routes