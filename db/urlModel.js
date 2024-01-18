const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  original_url: String,
  short_url: String,
});

const URL_MODEL = mongoose.model("URL_MODEL", urlSchema);

module.exports = URL_MODEL;