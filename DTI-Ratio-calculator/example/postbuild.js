var replace = require("replace");

replace({
    regex: "webpackJsonp",
    replacement: "webpackJsonp_" + Math.random().toString(36).substring(7),
    paths: ['dist'],
    recursive: true,
    silent: true,
    includes: "*.js"
});
console.log('webpackJsonp renamed');