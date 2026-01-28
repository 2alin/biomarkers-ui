const parsedUrl = new URL(window.location.href);
const { searchParams } = parsedUrl;

const delayInSeconds = Number(searchParams.get("secondsDelay"));

export default {
  // Place where we have our biomarkers data
  biomarkersDataPath: "/data/biomarkers.json",
  // Place where we have our results data
  resultsDataPath: "/data/results.json",
  // Delay (in ms) to simulate real scenario
  responseDelay: delayInSeconds ? delayInSeconds * 1000 : 2000,
  // Whether we should simulate an error in the API or not,
  simulateError: searchParams.has("simulateError") || false,
};
