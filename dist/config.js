"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("dotenv/config");

const config = {
  mongoDbUri: process.env['MONGODB_URI'],
  secret: process.env['SECRET']
};
exports.default = config;