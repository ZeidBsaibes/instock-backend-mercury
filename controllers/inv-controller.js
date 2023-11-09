const knex = require("knex")(require("../knexfile"));

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

  if (
    !warehouse_id ||
    !item_name ||
    !description ||
    !category ||
    !status ||
    !quantity
  ) {
    return res
      .status(400)
      .send("Check for missing properties in request body:");
  }

  // const eligibleWarehouses = await knex("warehouses")
  //   .select("id")
  //   .where(eligibleWarehouses.id === newInventoryItem.warehouse_id);
  // console.log(eligibleWarehouses);

  const checkExist = await knex("warehouses")
    .where({ id: warehouse_id })
    .first();

  if (!checkExist) {
    return res
      .status(400)
      .send({ message: `warehouse with id ${req.body.id} not found` });
  }

  if (typeof quantity !== "number") {
    return res.status(400).send("The quantity is the wrong data type:");
  }

  try {
    if (res.status === 400) {
      return res.status(404).send("Other error");
    }
    const 
    res.status(201).send("You have successfully created a new inventory item");
  } catch (error) {
    console.error(error);
  }
};

// edit an inventory item

const updateInventoryItem = async (req, res) => {
  try {
    res.status(200).send("this is the route to update an inventory item");
  } catch (error) {}
};

// delete an inventory item

const deleteInventoryItem = async (req, res) => {
  try {
    res.status(200).send("this is the route to delete an inventory item");
  } catch (error) {}
};

module.exports = {
  getAllInventories,
  getInventoryById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
