const router = require("express").Router();
const warehouseController = require("../controllers/wh-controller");

router.get("/", warehouseController.getAllWarehouses);

router.post("/", warehouseController.newWarehouse);

router.get("/:id", warehouseController.getOneWarehouse);

router.put("/:id", warehouseController.updateWarehouse);

router.delete("/:id", warehouseController.deleteWarehouse);

router.get("/:id/inventories", warehouseController.getInventoryInWarehouse);

module.exports = router;
