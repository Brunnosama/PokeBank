const pool = require('../../../db');
const queries = require('../queries');

const getCustomers = async (request, response) => {

    try {
        const results = await pool.query(queries.getCustomers);
        return response.status(200).json(results.rows);
    } catch (error) {
        throw error
    };
};

const getCustomerById = async (request, response) => {
    const { id } = request.params;
    if (isNaN(id)) {
        return response.status(404).send("No data Found");
    }
    try {
        const results = await pool.query(queries.getCustomersById, [id]);
        if (!results.rows.length) {
            return response.status(404).send("No data Found");
        }

        await pool.query(queries.getCustomersById, [id]);
        return response.status(200).json(results.rows);
    } catch (error) {
        throw error;
    }
};

const registerCustomer = async (request, response) => {
    const { first_name, last_name, email, password, documents, phone } = request.body;

    //check if the e-mail is already registered
    try {
        const results = await pool.query(queries.checkRegisteredEmail, [email]);
        if (results.rows.length) {
            return response.status(409).send("This email was already registered.");
        }
        //add customer to database
        await pool.query(queries.registerCustomer, [first_name, last_name, email, password, documents, phone]);
        return response.status(201).send("Customer successfully registered!");
    } catch (error) {
        throw error;
    }
};

const updateCustomer = async (request, response) => {

    const { id } = request.params;
    const { email, password, phone } = request.body;
    if (isNaN(id)) {
        return response.status(404).send("No data Found");
    }
    try {
        const results = await pool.query(queries.getCustomersById, [id]);
        if (!results.rows.length) {
            return response.status(404).send("No data Found");
        }

        await pool.query(queries.updateCustomer, [email, password, phone, id]);
        return response.status(200).send("Customer successfully updated!");
    } catch (error) {
        throw error;
    }

};

const removeCustomer = async (request, response) => {
    const { id } = request.params;
    if (isNaN(id)) {
        return response.status(404).send("No data Found");
    }
    try {
        const results = await pool.query(queries.getCustomersById, [id]); 
        if (!results.rows.length) {
            return response.status(404).send("No data Found");
        }
        await pool.query(queries.removeCustomer, [id]);
        return response.status(204);
    } catch (error) {
        throw error;

    }
};


module.exports = {
    getCustomers,
    getCustomerById,
    registerCustomer,
    removeCustomer,
    updateCustomer,
};