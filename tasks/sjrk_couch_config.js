/*
 * grunt-sjrk-couch-config
 * https://github.com/BlueSlug/grunt-sjrk-couch-config
 *
 * Copyright (c) 2017 OCAD University
 */

'use strict';

module.exports = function(grunt) {
    var couchConfig = require("sjrk-couch-config");

    grunt.registerMultiTask("sjrk_couch_config", "Automating declarative CouchDB configs using Infusion", function() {
        var done = this.async();

        this.files.forEach(function(f) {
            var nodeOptions = {
                cmd: process.argv[0], // node
                args: [f.src[0]], // the file path
                opts: {
                    stdio: "inherit"
                }
            };

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
