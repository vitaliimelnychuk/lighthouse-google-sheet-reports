const { readFileSync } = require("fs");
const { google } = require("googleapis");

const { spreadsheetId } = require("./config");
// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.

const createGoogleSheetClient = () => {
  const credentialsRaw = readFileSync("credentials.json");
  const { client_email, private_key } = JSON.parse(credentialsRaw);

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email,
      private_key,
    },
    scopes: SCOPES,
  });

  return google.sheets({ version: "v4", auth });
};

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1U5kZ5f6-DJ-5OU5gVazry_eddi0phCK-t-zpRimE9Sw/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
const getUrls = async (googleSheetClient) => {
  const { data } = await googleSheetClient.spreadsheets.values.get({
    spreadsheetId,
    range: "Tests!A2:A",
  });

  return data.values.map((row) => row[0]);
};

const addMetrics = async (googleSheetClient, { url, metrics, date }) => {
  const { accessibility, performance, bestPractices, seo } = metrics;
  const { data } = await googleSheetClient.spreadsheets.values.append({
    spreadsheetId,
    range: "Results!A:F",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[url, performance, accessibility, bestPractices, seo, date]],
    },
  });

  return data;
};

module.exports = {
  createGoogleSheetClient,
  getUrls,
  addMetrics,
};
