const knex = require("knex")(require("../knexfile"));
const {
  validateInventory,
} = require("../scripts/utils/validate-inventory-item");

// get all inventory items

const getAllInventories = async (req, res) => {
  try {
    const data = await knex("inventories")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .select(
        "inventories.id",
        "inventories.warehouse_id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity",
        "inventories.created_at",
        "inventories.updated_at"
      );
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

// get inventory item by ID

const getInventoryById = async (req, res) => {
  try {
    const data = await knex("inventories")
      .join("warehouses", "warehouses.id", "inventories.warehouse_id")
      .select(
        "inventories.id",
        "inventories.warehouse_id",
        "warehouses.warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity",
        "inventories.created_at",
        "inventories.updated_at"
      )
      .where("inventories.id", req.params.id)
      .first();
    if (!data) {
      return res
        .status(404)
        .send("Inventory item does not exist, check inventory number");
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
  }
};

// create a single inventory item

const createInventoryItem = async (req, res) => {
  const { warehouse_id, item_name, description, category, status, quantity } =
    req.body;

  const newInventoryItem = {
    warehouse_id: warehouse_id,
    item_name: item_name,
    description: description,
    category: category,
    status: status,
    quantity: quantity,
  };

  const checkExist = await knex("warehouses")
    .where({ id: warehouse_id })
    .first();

  if (!checkExist) {
    return res
      .status(400)
      .send({ message: `warehouse with id ${req.body.id} not found` });
  }

  // Then validate new inventory object

  const errors = validateInventory(req.body);

  if (errors.length > 0) {
    return res.status(400).send(errors);
  }

  try {
    if (res.status === 400) {
      return res.status(404).send("Other error");
    }
    const result = await knex("inventories").insert(newInventoryItem);

    res.status(201).send(newInventoryItem);
  } catch (error) {
    console.error(error);
  }
};

// edit an inventory item

const updateInventoryItem = async (req, res) => {
  try {
    // first check inventory item exists
    const checkExists = await knex("inventories")
      .where({ id: req.params.id })
      .first();
    if (!checkExists) {
      return res
        .status(404)
        .send({ message: `inventory item with id ${req.params.id} not found` });
    }
    // then check that proposed warehouse exists
    const requestWarehouse = req.body.warehouse_id;
    const checkWarehouseExists = await knex("warehouses")
      .where({ id: requestWarehouse })
      .first();
    if (!checkWarehouseExists) {
      return res.status(404).send({
        message: `warehouse with id: ${requestWarehouse} does not exist`,
      });
    }

    //if inventory item exists and warehouse exists then validate body

    const errors = validateInventory(req.body);

    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    await knex("inventories").where({ id: req.params.id }).update(req.body);

    const editedInventory = await knex("inventories")
      .where({ id: req.params.id })
      .first();

    return res.status(200).send(editedInventory);
  } catch (error) {}
};

// delete an inventory item

const deleteInventoryItem = async (req, res) => {
  try {
    const inventoryItem = await knex("inventories")
      .where({ id: req.params.id })
      .first();

    if (!inventoryItem) {
      return res.status(404).send({
        message: `Inventory with ID ${req.params.id} not found`,
      });
    }

    await knex("inventories").where({ id: req.params.id }).del();

    res.status(204).send({
      message: `Inventory with ID ${req.params.id} has been deleted successfully`,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: `Unable to delete inventory with ID ${req.params.id}`,
    });
  }
};

module.exports = {
  getAllInventories,
  getInventoryById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
