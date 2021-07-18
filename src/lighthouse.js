const lighthouse = require("lighthouse");

const runForPage = async (pageUrl, options) => {
  const defaultOptions = {
    logLevel: "info",
    output: "html",
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  };
  const runnerResult = await lighthouse(pageUrl, {
    ...defaultOptions,
    ...options,
  });

  console.log(runnerResult.lhr);

  return {
    performance: runnerResult.lhr.categories.performance.score * 100,
    accessibility: runnerResult.lhr.categories.accessibility.score * 100,
    bestPractices: runnerResult.lhr.categories["best-practices"].score * 100,
    seo: runnerResult.lhr.categories.seo.score * 100,
  };
};

module.exports = {
  runForPage,
};
