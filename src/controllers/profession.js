const path = require("path");
const professionsModel = require("../models/users/Profession.model");

exports.fetchProfessionals = async (req, res) => {
  const professionals = await professionsModel.professions();
  res.status(200).send({
    data: professionals,
    statusCode: 200,
    errorMessage: "Page not found",
  });
};
