const knex = require("knex")(require("../knexfile"));

// get all inventory items

const getAllInventories = async (req, res) => {
  try {
    res.status(200).send("this is the route for all inventory items");
  } catch (error) {
    console.error(error);
  }
};

// get inventory item by ID

const getInventoryById = async (req, res) => {
  try {
    res.status(200).send("this is the route for a specific inventory item");
  } catch (error) {
    console.error(error);
  }
};

// create a single inventory item

const createInventoryItem = async (req, res) => {
  try {
    res.status(200).send("this is the route to create a new inventory item");
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
