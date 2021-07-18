const chromeLauncher = require("chrome-launcher");
const {
  createGoogleSheetClient,
  getUrls,
  addMetrics,
} = require("./src/googleSheet");
const { runForPage } = require("./src/lighthouse");
const { formatDate } = require("./src/utils");

async function main() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const lighthouseOptions = {
    port: chrome.port,
  };
  const googleSheetClient = createGoogleSheetClient();

  const urls = await getUrls(googleSheetClient);
  const date = formatDate(new Date());
  for (const urlIndex in urls) {
    const url = urls[urlIndex];
    const metrics = await runForPage(url, lighthouseOptions);
    await addMetrics(googleSheetClient, { url, metrics, date });
  }

  await chrome.kill();
}

main();
