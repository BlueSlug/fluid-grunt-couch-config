// These eslint directives prevent the linter from complaining about the use of
// globals or arguments that will be prevent in CouchDB design doc functions
// such as views or validate_doc_update

/* global emit */

"use strict";

require("infusion");
require("fluid-couch-config");

fluid.defaults("fluid.couchConfig.gruntTestDb", {
    gradeNames: ["fluid.couchConfig.pipeline"],
    couchOptions: {
        dbName: "couch-config-grunt-test-db"
    },
    listeners: {
        onCreate: "{that}.configureCouch",
        onSuccess: "fluid.log(SUCCESS)",
        onError: "fluid.log({arguments}.0.message)"
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
    dbDesignDocuments: {
        views: {
            "testView1": {
                "map": "fluid.couchConfig.gruntTestDb.testViewFunction"
            },
            validate_doc_update: "fluid.couchConfig.gruntTestDb.validateFunction"
        }
    }
});

fluid.couchConfig.gruntTestDb.testViewFunction = function (doc) {
    if (doc.value.tags.length > 0) {
        for (var idx in doc.value.tags) {
            emit(doc.value.tags[idx], doc.value.title);
        }
    }
};

// eslint-disable-next-line no-unused-vars
fluid.couchConfig.gruntTestDb.validateFunction = function (newDoc, oldDoc, userCtx, secObj) {
    if (!newDoc.type) {
        throw ({forbidden: "doc.type is required"});
    }
};

fluid.couchConfig.gruntTestDb();
