function filterByCategory(category, query) {
  if (category) {
    if (query.includes('WHERE')) {
      return `${query} AND category='${category}'`;
    } else {
      return `${query} WHERE category='${category}'`;
    }
  } else {
    return query;
  }
}

module.exports = { filterByCategory };
