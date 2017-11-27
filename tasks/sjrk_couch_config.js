/*
 * fluid-grunt-couch-config
 * https://github.com/fluid-project/fluid-grunt-couch-config
 *
 * Copyright (c) 2017 OCAD University
 */

"use strict";

module.exports = function (grunt) {
    //var couchConfig = require("fluid-couch-config");

    grunt.registerMultiTask("fluid_couch_config", "Automating declarative CouchDB configs using Infusion", function () {
        var done = this.async();

        this.files.forEach(function (f) {
            var nodeOptions = {
                cmd: process.argv[0], // node
                args: [f.src[0]], // the file path
                opts: {
                    stdio: "inherit"
                }
            };

            // eslint-disable-next-line no-unused-vars
            grunt.util.spawn(nodeOptions, function (error, result, code) {
                if (error) {
                    grunt.log.writeln("An error occurred while running the CouchConfig file: " + error);
                } else {
                    grunt.log.writeln("CouchConfig file " + f.src + " was run successfully.");
                }

                done();
            });
        });
    });
};
