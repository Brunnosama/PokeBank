const pool = require('../../../db');
const queries = require('../queries');

const getCustomers = (request, response) => {
    pool.query(queries.getCustomers, (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    });
};

const getCustomerById = (request, response) => {
    const { id } = request.params;
    if (isNaN(id)) {
        return response.status(400).send('invalid customer Id.');
    }
    pool.query(queries.getCustomersById, [id], (error, results) => {
        if (error) throw error;
        response.status(200).json(results.rows);
    });
};

const registerCustomer = (request, response) => {
    const { first_name, last_name, email, password, documents, phone } = request.body;

    //check if the e-mail is already registered
    pool.query(queries.checkRegisteredEmail, [email], (error, results) => {
        if (results.rows.length) {
            response.status(409).send("This email was already registered.");
        }
        //add customer to database
        pool.query(queries.registerCustomer, [first_name, last_name, email, password, documents, phone], (error, results) => {
            if (error) throw error;
            response.status(201).send("Customer successfully registered!");
        });
    });
};

const updateCustomer = (request, response) => {
    const { id } = request.params;
    const { email, password, phone } = request.body;
    if (isNaN(id)) {
        return response.status(400).send('invalid customer Id.');
    } else {
        pool.query(queries.getCustomersById, [id], (error, results) => {
            const noCustomerFound = !results.rows.length;
            if (noCustomerFound) {
                return response.send("Customer does not exist in the Pokebank App");
            }
            pool.query(queries.updateCustomer, [email, password, phone, id], (error, results) => {
                if (error) throw error;
                response.status(200).send("Customer successfully updated!");
            });
        });
    }
}

const removeCustomer = (request, response) => {
    const { id } = request.params;
    if (isNaN(id)) {
        return response.status(400).send('invalid customer Id.');
    } else {
        pool.query(queries.getCustomersById, [id], (error, results) => {
            const noCustomerFound = !results.rows.length;
            if (noCustomerFound) {
                return response.send("Customer does not exist on the Pokebank App");
            }
            pool.query(queries.removeCustomer, [id], (error, results) => {
                if (error) throw error;
                response.status(200).send("Customer successfully removed!");
            });
        });
    }
}


module.exports = {
    getCustomers,
    getCustomerById,
    registerCustomer,
    removeCustomer,
    updateCustomer,
};