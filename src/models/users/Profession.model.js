const fs = require("fs");
const db = require("../../../db/dbConnection");

exports.professions = async () => {
  let professions;
  try {
    professions = await db.query("SELECT * FROM professions");
  } catch (error) {
    throw new Error("An error has occurred in the db");
  }

  if (!professions.rows.length) {
    throw new Error("No Professionals avillable");
  }

  return professions.rows;
};
