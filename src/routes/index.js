const customersApi = require("../customer/routes");

module.exports = (app) => {
    app.get("/", (request, response) =>
        response.send("Welcome to the API Root Route!")
    );
    app.use("/pokebank-api", customersApi);
}