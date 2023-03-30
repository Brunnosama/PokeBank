const getCustomers = 'SELECT * FROM customers';
const getCustomersById = 'SELECT * FROM customers WHERE id = $1';
const checkRegisteredEmail = 'SELECT customer FROM customers customer WHERE customer.email = $1';
const registerCustomer = 'INSERT INTO customers (first_name, last_name, email, password, documents, phone) VALUES ($1, $2, $3, $4, $5, $6)';
const updateCustomer = 'UPDATE customers SET email = $1, password = $2, phone = $3  WHERE id = $4';
const removeCustomer = 'DELETE FROM customers WHERE id = $1';

module.exports = {
    getCustomers,
    getCustomersById,
    checkRegisteredEmail,
    registerCustomer,
    updateCustomer,
    removeCustomer
}