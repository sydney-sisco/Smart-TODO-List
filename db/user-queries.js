const db = require('../lib/db.js');

const dataFetcher = (conditionType, condition) => {
  const text = `
  SELECT *
  FROM users
  WHERE ${conditionType} = $1;`
  const values = [condition];

  return db.query(text, values);
};

const insertUserAndReturn = requestData => {
  const text = `
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *`
    const values = [requestData.registerFname, requestData.registerLname, requestData.registerEmail, requestData.registerPassword];

    return db.query(text, values)
              .then(data => data.rows[0].id)
              .catch(err => console.log('Error inserting user data into database (user-queries)', err.message));
};

module.exports = {
  dataFetcher,
  insertUserAndReturn
}
