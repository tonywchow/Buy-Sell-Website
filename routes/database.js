const { Pool } = require("pg");

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
  port: 5432,
});

pool.connect().then(() => {
  console.log("Connected to database!");
});

/*
Adding product to database
*/
const addProduct = function (products) {
  let queryString = `
  INSERT INTO products(admin_id, title, description, thumbnail_photo_url, price)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  )`;

  let values = [
    products.admin_id,
    products.title,
    products.description,
    products.thumbnail_photo_url,
    products.price,
  ];
  return pool
    .query(queryString, values)
    .then((res) => {
      console.log(res.rows);
      return res.rows;
    })
    .catch((error) => console.log(error));
};

module.exports = {
  addProduct,
};
