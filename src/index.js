const express = require("express");
const app = express();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;

app.use(express.json());

routes(app);

app.listen(PORT, () => console.log(`The server is running on the ${PORT} port`));