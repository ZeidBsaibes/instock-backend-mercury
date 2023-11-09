const knex = require("knex")(require("../knexfile"));

const getAllWarehouses = async (_req, res) => {
  try {
    const warehouses = await knex("warehouses");

    return res.status(200).send(warehouses);
  } catch (error) {
    console.error("Database error:", error);
  }
};

const getOneWarehouse = async (req, res) => {
  try {
    const warehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    if (!warehouse) {
      return res.status(404).send({
        message: `Warehouse with ID  ${req.params.id} not found`,
      });
    }

    res.send(warehouse);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: `Unable to retrieve warehouse data for the ID of ${req.params.id}`,
    });
  }
};

const updateWarehouse = async (req, res) => {
  try {
    //first check if warehouse exists
    const checkExists = await knex("warehouses")
      .where({ id: req.params.id })
      .first();
    if (!checkExists) {
      return res
        .status(404)
        .send({ message: `warehouse with id ${req.params.id} not found` });
    }

    const {
      warehouse_name,
      address,
      city,
      country,
      contact_name,
      contact_position,
      contact_phone,
      contact_email,
    } = req.body;

    //if warehouse exists then perform validation on request.body

    const errors = [];

    if (!warehouse_name) {
      errors.push({ message: "missing warehouse name" });
    }
    if (!address) {
      errors.push({ message: "missing warehouse address" });
    }
    if (!city) {
      errors.push({ message: "missing warehouse city" });
    }
    if (!country) {
      errors.push({ message: "missing warehouse country" });
    }
    if (!contact_name) {
      errors.push({ message: "missing warehouse contact name" });
    }
    if (!contact_position) {
      errors.push({ message: "missing warehouse contact position" });
    }
    if (!contact_phone) {
      errors.push({ message: "missing warehouse contact phone" });
    }
    if (!contact_phone) {
      errors.push({ message: "missing warehouse contact phone" });
    }
    if (!contact_email) {
      errors.push({ message: "missing warehouse contact email" });
    }
    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    // insert updated warehouse into database
    await knex("warehouses").where({ id: req.params.id }).update(req.body);

    // request and return updated warehouse

    const editedWarehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();
    res.status(200).send(editedWarehouse);
  } catch (error) {
    console.error(error);
  }
};

const newWarehouse = async (req, res) => {
  try {
    res.status(200).send("this is the route for a new warehouse");
  } catch (error) {
    console.error(error);
  }
};

const deleteWarehouse = async (req, res) => {
  try {
    const warehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();

    if (!warehouse) {
      return res.status(404).send({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }

    await knex("warehouses").where({ id: req.params.id }).del();

    res.status(204).send({
      message: `Warehouse with ID ${req.params.id} has been deleted successfully`,
    });
  } catch (error) {
    console.error(error);

    res.status(500).send({
      message: `Unable to delete warehouse with ID ${req.params.id}`,
    });
  }
};

const getInventoryInWarehouse = async (req, res) => {
  try {
    res
      .status(200)
      .send("this is the route to get inventory at a specific warehouse");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllWarehouses,
  getOneWarehouse,
  updateWarehouse,
  newWarehouse,
  deleteWarehouse,
  getInventoryInWarehouse,
};
