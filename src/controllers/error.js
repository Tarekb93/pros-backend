const path = require("path");

exports.client = (req, res) => {
  res.status(404).send({
    statusCode: 404,
    errorMessage: "Page not found",
  });
};

exports.server = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    statusCode: 500,
    errorMessage: "Internal server error",
  });
};
