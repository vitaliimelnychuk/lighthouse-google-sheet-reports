const fs = require("fs");
const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

(async () => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
  const options = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
    port: chrome.port,
  };
  const runnerResult = await lighthouse("https://example.com", options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync("lhreport.html", reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log("categories", runnerResult.lhr.categories);
  console.log(
    "Performance:",
    runnerResult.lhr.categories.performance.score * 100
  );
  console.log(
    "accessibility:",
    runnerResult.lhr.categories.accessibility.score * 100
  );

  console.log("seo:", runnerResult.lhr.categories.seo.score * 100);

  console.log(
    "best-practices:",
    runnerResult.lhr.categories["best-practices"].score * 100
  );
  await chrome.kill();
})();
