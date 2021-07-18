require("dotenv").config();

googleSheetId = process.env.GOOGLE_SHEET_ID;

module.exports = {
  googleSheetId,
};
