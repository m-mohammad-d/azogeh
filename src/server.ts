require("dotenv").config();
import { Express } from "express";
const app = require("express")() as Express;

require("./start/db")();
require("./start/config")(app);
require("./start/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
