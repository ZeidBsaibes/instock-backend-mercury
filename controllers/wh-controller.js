const knex = require("knex")(require("../knexfile"));

const getAllWarehouses = async (_req, res) => {
  try {
    res.status(200).send("this is the route for all warehouses");
  } catch (error) {
    console.error(error);
  }
};

const getOneWarehouse = async (req, res) => {
  try {
    res.status(200).send(`this is the route for a single warehouse`);
  } catch (error) {
    console.error(error);
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
    res.status(200).send(`this is the route to delete a warehouse`);
  } catch (error) {
    console.error(error);
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
