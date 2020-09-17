const path = require("path");
const workersModel = require("../models/users/Workers.model");

exports.fetchWorkerLocation = async (req, res) => {
  const workers = await workersModel.findByWorkerLocation(req.params.name);
  res.status(200).send({
    data: workers,
    statusCode: 200,
    errorMessage: "Page not found",
    location: req.params.name,
  });
};

exports.fetchProfessionalName = async (req, res) => {
  const professionals = await workersModel.findByProfessionName(
    req.params.name
  );
  res.status(200).send({
    data: professionals,
    statusCode: 200,
    errorMessage: "Page not found",
    name: req.params.name,
  });
};

exports.fetchWorkers = async (req, res) => {
  const workers = await workersModel.workers();
  res.status(200).send({
    data: workers,
    statusCode: 200,
    errorMessage: "Page not found",
  });
};
