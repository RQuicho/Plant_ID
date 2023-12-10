const {BadRequestError} = require("../expressError");

// This function helps make the SET clause for and SQL UPDATE statement.
// Example:
// {firstName: 'Jane', email: 'new@email.com'} =>
// {setCols: '"first_name"=$1, "age"=$2', values: ['Jane', 'new@email.com']}

const sqlForPartialUpdate = (dataToUpdate, jsToSql) => {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  const cols = keys.map((colName, idx) => 
    `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(', '),
    values: Object.values(dataToUpdate)
  };
}

module.exports = {sqlForPartialUpdate}