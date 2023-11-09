const knex = require("knex")(require("../knexfile"));
const { validateWarehouse } = require("../scripts/utils/validate-warehouse");

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

    //if warehouse exists then perform validation on request.body

    const errors = validateWarehouse(req.body);

    if (errors.length > 0) {
      return res.status(400).send(errors);
    }

    if (errors.length > 0) {
      return res.status(400).send(errors);
    }
    // insert updated warehouse into database
    await knex("warehouses").where({ id: req.params.id }).update(req.body);

    // request db update and return updated warehouse
    const editedWarehouse = await knex("warehouses")
      .where({ id: req.params.id })
      .first();
    res.status(200).send(editedWarehouse);
  } catch (error) {
    console.error(error);
  }
};

const newWarehouse = async (req, res) => {
  // perform validation on new warehouse object
  const errors = validateWarehouse(req.body);

  if (errors.length > 0) {
    return res.status(400).send(errors);
  }

  const newWarehouse = {
    warehouse_name: req.body.warehouse_name,
    address: req.body.address,
    city: req.body.city,
    country: req.body.country,
    contact_name: req.body.contact_name,
    contact_position: req.body.contact_position,
    contact_phone: req.body.contact_phone,
    contact_email: req.body.contact_email,
  };

  try {
    const result = await knex("warehouses").insert(newWarehouse);
    const createdWarehouse = await knex("warehouses")
      .where({ id: result[0] })
      .first();
    res.status(201).send(createdWarehouse);
  } catch (error) {
    res.status(500).json({
      message: `Cannot create new warehouse: ${error}`,
    });
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
    const { id: warehouse_id } = req.params.id;
    const inventoryInWarehouse = await knex("inventories")
      .select("id", "item_name", "category", "status", "quantity")
      .where({ warehouse_id: req.params.id });
    if (!warehouse_id) {
      return res
        .status(404)
        .send("Warehouse does not exist, check warehouse number");
    }
    res.status(200).send(inventoryInWarehouse);
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
