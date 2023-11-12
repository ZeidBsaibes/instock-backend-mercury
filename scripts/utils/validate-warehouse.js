const validateWarehouse = (requestBody) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = requestBody;

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

  //regex to test phone number format
  const regexCheckPhoneNumber =
    /^(?:\+?\d{1,3})?[-\s.]?(?:\(\d{1,4}\)|\d{1,4})?[-\s.]?\d{1,4}[-\s.]?\d{1,4}[-\s.]?\d{1,9}$/;

  if (!regexCheckPhoneNumber.test(contact_phone)) {
    errors.push({ message: "bad phone number format" });
  }

  if (!contact_email) {
    errors.push({ message: "missing warehouse contact email" });
  }

  const regexCheckEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!regexCheckEmail.test(contact_email)) {
    errors.push({ message: "bad email format" });
  }

  return errors;
};

module.exports = {
  validateWarehouse,
};
