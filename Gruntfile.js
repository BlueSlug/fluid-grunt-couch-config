/*
 * fluid-grunt-couch-config
 * https://github.com/fluid-project/fluid-grunt-couch-config
 *
 * Copyright (c) 2017 OCAD University
 */

"use strict";

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ["tmp"]
        },

        // Configuration to be run (and then tested).
        fluid_couch_config: {
            files: ["test/fixtures/dbSetup.js"]
        },

        // Unit tests.
        nodeunit: {
            tests: ["test/*_test.js"]
        },

        eslint: {
            all: ["test/**/*.js", "tasks/*.js", "*.js"]
        },

        jsonlint: {
            all: ["package.json", ".jshintrc", "test/**/*.json"]
        }
    });

    // Actually load this plugin"s task(s).
    grunt.loadTasks("tasks");

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("fluid-grunt-eslint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-nodeunit");
    grunt.loadNpmTasks("grunt-jsonlint");

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask("test", ["clean", "fluid_couch_config", "nodeunit"]);
    grunt.registerTask("run-without-test", ["fluid_couch_config"]);
    grunt.registerTask("lint", "Apply eslint and jsonlint", ["eslint", "jsonlint"]);

    // By default, lint and run all tests.
    grunt.registerTask("default", ["lint", "run-without-test"]);

};
