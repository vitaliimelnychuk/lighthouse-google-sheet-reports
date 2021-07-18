require("dotenv").config();

spreadsheetId = process.env.GOOGLE_SHEET_ID;

module.exports = {
  spreadsheetId,
};
