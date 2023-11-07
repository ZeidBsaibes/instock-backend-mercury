const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT;

const warehouseRoutes = require("./routes/warehouse-routes");
const inventoryRoutes = require("./routes/inventory-routes");

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("this is the / api endpoint ");
});

app.use("/warehouse", warehouseRoutes);
app.use("/inventory", inventoryRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
