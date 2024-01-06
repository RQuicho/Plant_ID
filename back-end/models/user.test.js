"use strict";

const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError
} = require("../expressError");
const db = require("../db");
const User = require("./user");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testListNames
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

// Authenticate
describe("authenticate", function() {
  test("works", async function() {
    const user = await User.authenticate("user1", "password1");
    expect(user).toEqual({
      username: 'user1',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'user1@email.com'
    });
  });
  test("unauth if no such user", async function() {
    try {
      await User.authenticate('user29', 'not right');
      fail();
    } catch (err) {
      expect(err instanceof UnauthorizedError).toBeTruthy();
    }
  });
});

// Register
describe("register", function() {
  const newUser = {
    username: 'newUser',
    firstName: 'test',
    lastName: 'testing',
    email: 'test@email.com'
  };

  test("works", async function() {
    let user = await User.register({
      ...newUser,
      password: "password"
    });
    expect(user).toEqual(newUser);
    const found = await db.query("SELECT * FROM users WHERE username = 'newUser'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });
  test("bad request with duplicate data", async function() {
    try {
      await User.register({
        ...newUser,
        password: "password"
      });
      await User.register({
        ...newUser,
        password: "password"
      });
      fail();
    } catch (err) {
      expect(err instanceof BadRequestError).toBeTruthy();
    }
  });
});

// GET
describe("get", function() {
  test("works", async function() {
    let user = await User.get('user1');
    expect(user).toEqual({
      username: 'user1',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'user1@email.com',
      userlist: [testListNames[0], testListNames[2]]
    });
  });
  test("not found if no such user", async function() {
    try {
      await User.get('does not exist');
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// GET user lists
describe("get user lists", () => {
  test("works", async() => {
    let lists = await User.getAllLists('user1');
    expect(lists).toEqual([
      { username: 'user1',
        list_name: 'list1'
      },
      { username: 'user1',
        list_name: 'list3'
      }
    ]);
  });
});

// UPDATE
describe("update", function() {
  const updateData = {
    firstName: 'updatedFN',
    lastName: 'updatedLN',
    email: 'updated@email.com'
  };
  test("works", async function() {
    let user = await User.update('user1', updateData);
    expect(user).toEqual({
      username: 'user1',
      ...updateData
    });
  });
  test("updated password", async function() {
    let user = await User.update('user1', {
      password: "updatedPW"
    });
    expect(user).toEqual({
      username: 'user1',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'user1@email.com'
    });
    const found = await db.query("SELECT * FROM users WHERE username = 'user1'");
    expect(found.rows.length).toEqual(1);
    expect(found.rows[0].password.startsWith("$2b$")).toEqual(true);
  });
  test("not found if no such user", async function() {
    try {
      await User.update('wrong', {
        first_name: 'update non-existing'
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
    await User.remove('user1');
    const res = await db.query(
      "SELECT * FROM users WHERE username='user1'");
    expect(res.rows.length).toEqual(0);
  });
  test("not found if no such user", async function() {
    try {
      await User.remove("non-existing user");
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

// Add list to user
describe("add list to user", function() {
  test("works", async function() {
    await User.addListToUser('user1', testListNames[1]);

    const res = await db.query(
      "SELECT username, list_name FROM userList WHERE list_name = $1", [testListNames[1]]
    );
    expect(res.rows).toEqual([{
      username: "user1",
      list_name: testListNames[1]
    }]);
  });
  test("not found if no such user", async function() {
    try {
      await User.addListToUser('non-existing user', [testListNames[1]]);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});