const {sqlForPartialUpdate} = require("./sql");

describe("sqlForPartialUpdate", function() {
  test("works: 1 item", function() {
    const result = sqlForPartialUpdate(
      {firstName: 'Jane'},
      {firstName: 'first_name', lastName: 'last_name'});
    expect(result).toEqual({
      setCols: '"first_name"=$1',
      values: ['Jane']
    });
  });
  test("works: 2 items", function() {
    const result = sqlForPartialUpdate(
      {firstName: 'Jane', lastName: 'Doe'},
      {firstName: 'first_name', lastName: 'last_name'});
    expect(result).toEqual({
      setCols: '"first_name"=$1, "last_name"=$2',
      values: ['Jane', 'Doe']
    });
  });
});