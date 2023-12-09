"use strict";

describe("config can come from env", function() {
  test("works", function() {
    process.env.SECRET_KEY = 'secretkey';
    process.env.PORT = '4000';
    process.env.NODE_ENV = 'other';
    
    const config = require("./config");
    expect(config.SECRET_KEY).toEqual('secretkey');
    expect(config.PORT).toEqual(4000);
    expect(config.DB_NAME).toEqual('plantid');
    expect(config.BCRYPT_WORK_FACTOR).toEqual(12);

    delete process.env.SECRET_KEY;
    delete process.env.PORT;
    delete process.env.DB_NAME;
    delete process.env.BCRYPT_WORK_FACTOR;

    process.env.NODE_ENV = "test";
    jest.resetModules();
    const configTest = require("./config");
    expect(configTest.DB_NAME).toEqual('plantid_test');
  });
});