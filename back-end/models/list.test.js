"use strict";

const {BadRequestError, NotFoundError} = require("../expressError");
const List = require("./list");
const db = require("../db");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testPlantIds
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// Create
describe("create", function() {
  const newList = {
    name: "test list",
    description: "this is a description of a list."
  };
  test("works", async function() {
    let list = await List.create({...newList});
    expect(list).toEqual(newList);
    const found = await db.query("SELECT * FROM lists WHERE name = 'test list'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].description).toEqual("this is a description of a list.");
  });
  test("bad request with duplicate data", async function() {
    try {
      await List.create({...newList});
      await List.create({...newList});
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

// GET
describe("get", function() {
  test("works", async function() {
    let list = await List.get("list1");
    expect(list).toEqual({
      name: "list1",
      description: "test for list1",
      listplant: [testPlantIds[0]]
    });
  });
  test("not found if no such list", async function() {
    try {
      await List.get('not a list');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// UPDATE
describe("update", function() {
  const updateData = {
    description: "updated description"
  };
  test("works", async function() {
    let list = await List.update("list1", updateData);
    expect(list).toEqual({
      name: "list1",
      ...updateData
    });
  });
  test("not found if no such list", async function() {
    try {
      await List.update("non-existing list", {
        description: "description of nothing"
      });
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  }); 
});

// REMOVE
describe("remove", function() {
  test("works", async function() {
    await List.remove('list1');
    const res = await db.query(
      "SELECT * FROM lists WHERE name='list1'");
    expect(res.rows.length).toEqual(0);
  });
  test("not found if no such list", async function() {
    try {
      await List.remove('non-existing lis');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// Add plant to list
describe("add plant to list", function() {
  test("works", async function() {
    await List.addPlantToList('list2', testPlantIds[0]);

    const res = await db.query(
      "SELECT list_name, plant_id FROM listPlant WHERE plant_id = $1", [testPlantIds[0]]
    );
    expect(res.rows).toEqual([
      {
        list_name: 'list1',
        plant_id: testPlantIds[0]
      },
      {
        list_name: 'list2',
        plant_id: testPlantIds[0]
      }
    ]);
  });
  test("not found if no such user", async function() {
    try {
      await List.addPlantToList('non-existing list', [testPlantIds[0]]);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});