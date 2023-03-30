const { Router } = require("express");
const customerController = require('./controllers/customerController');
const route = Router();

route.get('/customer', customerController.getCustomers);
route.get('/customer/:id', customerController.getCustomerById);
route.post('/customer', customerController.registerCustomer);
route.put('/customer/:id', customerController.updateCustomer);
route.delete('/customer/:id', customerController.removeCustomer);

module.exports = route;