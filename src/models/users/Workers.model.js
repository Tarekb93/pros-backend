const fs = require("fs");
const db = require("../../../db/dbConnection");

exports.findByWorkerLocation = async (location) => {
  let userLoc;
  console.log(location);
  try {
    userLoc = await db.query("SELECT * FROM workers WHERE location = $1", [
      location,
    ]);
  } catch (error) {
    console.log(error);
    throw new Error("An error has occurred in the db");
  }

  if (!userLoc.rows.length) {
    throw new Error("No worker in this location");
  }

  return userLoc.rows;
};

exports.findByProfessionName = async (name) => {
  let profName;
  try {
    profName = await db.query(
      "SELECT * FROM workers WHERE professionName = $1",
      [name]
    );
  } catch (error) {
    throw new Error("An error has occurred in the db");
  }

  if (!profName.rows.length) {
    throw new Error("No Professional by this Name");
  }

  return profName.rows;
};

exports.findByWorkerName = async (name) => {
  let WorkerName;
  try {
    WorkerName = await db.query("SELECT * FROM workers WHERE fullName = $1", [
      name,
    ]);
  } catch (error) {
    throw new Error("An error has occurred in the db");
  }

  if (!WorkerName.rows.length) {
    throw new Error("No Workers by this Name");
  }

  return WorkerName.rows;
};

exports.workers = async () => {
  let workers;
  try {
    workers = await db.query("SELECT * FROM workers");
  } catch (error) {
    throw new Error("An error has occurred in the db");
  }

  if (!workers.rows.length) {
    throw new Error("No Workers avillable");
  }

  return workers.rows;
};
