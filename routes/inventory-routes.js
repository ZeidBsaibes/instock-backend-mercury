const router = require("express").Router();
const inventoryController = require("../controllers/inv-controller");

//get all inventory items

router.get("/", inventoryController.getAllInventories);

// get inventory item by ID

router.get("/:id", inventoryController.getInventoryById);

//create an inventory item

router.post("/", inventoryController.createInventoryItem);

// edit an inventory item

router.put("/:id", inventoryController.updateInventoryItem);

// delete an inventory item

router.delete("/:id", inventoryController.deleteInventoryItem);

module.exports = router;
