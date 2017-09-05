// These eslint directives prevent the linter from complaining about the use of
// globals or arguments that will be prevent in CouchDB design doc functions
// such as views or validate_doc_update

/* global sjrk, emit, newDoc, oldDoc, userCtx, secObj */
/*eslint no-unused-vars: ["error", { "vars": "local", "argsIgnorePattern": "newDoc|oldDoc|userCtx|secObj" }]*/

"use strict";

require("infusion");

var sjrk = fluid.registerNamespace("sjrk");
require("sjrk-couch-config");

fluid.defaults("sjrk.storyTelling.server.storiesDb", {
    gradeNames: ["sjrk.server.couchConfig.auto"],
    dbConfig: {
        dbName: "couch-config-grunt-test-db",
        designDocName: "views"
    },
    dbDocuments: {
        "testDoc1": {
            "type": "test",
            "value": {
                "testKey": "Test value",
                "testArray": ["test1", "test2"]
            }
        },
        "testDoc2": {
            "notType": "this will fail validation"
        }
    },
    dbViews: {
        "storyTags": {
            "map": "sjrk.storyTelling.server.storiesDb.storyTagsFunction"
        }
    },
    dbValidate: {
        validateFunction: "sjrk.storyTelling.server.storiesDb.validateFunction"
    }
});

sjrk.storyTelling.server.storiesDb.storyTagsFunction = function (doc) {
    if (doc.value.tags.length > 0) {
        for (var idx in doc.value.tags) {
            emit(doc.value.tags[idx], doc.value.title);
        }
    }
};

sjrk.storyTelling.server.storiesDb.validateFunction = function (newDoc, oldDoc, userCtx, secObj) {
    if (!newDoc.type) {
        throw ({forbidden: "doc.type is required"});
    }
};

sjrk.storyTelling.server.storiesDb();
