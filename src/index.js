const express = require('express')

const PORT = 3000;

const app = express();

app.get("/ping", (req, res) =>
    res.json({ message: 'success 2' })
        .status(200)
)

app.listen(PORT, () => console.log(`server is listen on port ${PORT}`));