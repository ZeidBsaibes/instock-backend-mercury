const validateInventory = (requestBody) => {
  const { item_name, description, category, status, quantity } = requestBody;

  const errors = [];

  const categoryOptions = [
    "electronics",
    "gear",
    "apparel",
    "accessories",
    "health",
  ];

  if (!item_name) {
    errors.push({ message: "missing item name" });
  }

  if (!description) {
    errors.push({ message: "missing description" });
  }
  if (!categoryOptions.includes(category.toLowerCase())) {
    errors.push({
      message:
        "Allowed categories are Electronics, Gear, Apparel, Accessories, Health",
    });
  }
  if (Number(quantity) > 1000000) {
    errors.push({ message: "quantity is too large" });
  }

  if (isNaN(Number(quantity))) {
    errors.push({ message: "quantity must be a number or a numeric string" });
  }

  if (status !== "In Stock" && status !== "Out of Stock") {
    errors.push({ message: "invalid status designation" });
  }

  return errors;
};

module.exports = {
  validateInventory,
};
