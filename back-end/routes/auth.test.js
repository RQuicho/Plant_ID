"use strict";

const jsonschema = require("jsonschema");
const User = require("../models/user");
const router = new express.Router();
const {createToken} = require("../helpers/tokens");
const userAuthSchema = require("../schemas/user/userAuth.json");
const userRegisterSchema = require("../schemas/user/userRegister.json");
const {BadRequestError} = require("../expressError");

describe("create token for existing user", function() {
  test("works", async function() {
    
  })
})