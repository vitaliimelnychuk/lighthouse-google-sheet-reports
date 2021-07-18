const formatDate = (date) =>
  date.toISOString().replace(/T/, " ").replace(/\..+/, "");

module.exports = {
  formatDate,
};
