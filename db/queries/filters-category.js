function filterByCategory(category, query) {
  if (category) {
    return `${query} WHERE category='${category}'`;
  } else {
    return query;
  }
}

module.exports = { filterByCategory }
