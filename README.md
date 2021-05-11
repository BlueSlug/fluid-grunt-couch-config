# _NOTE: This repository is not used and has been archived._

# fluid-grunt-couch-config

> Automating declarative CouchDB configs using Infusion

## Getting Started
This plugin requires Grunt `0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install fluid-grunt-couch-config --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('fluid-grunt-couch-config');
```

## The "fluid_couch_config" task

### Overview and Usage Examples
In your project's Gruntfile, add a section named `fluid_couch_config` to the data object passed into `grunt.initConfig()`.

Given the file `test/fixtures/dbSetup.js` which contains an implementation of `fluid.couchConfig` or `fluid.couchConfig.pipeline` (as is the case in the sample code in this repository), add the file to the grunt task's list of targeted files and register the task.

```js
grunt.initConfig({
    fluid_couch_config: {
        files: ["test/fixtures/dbSetup.js"] // Target-specific file list goes here.
    },
});

grunt.registerTask("run-fluid-couch-config", ["fluid_couch_config"]);
```

From there, run the task from a command shell. Upon successful completion, the CouchDB database and documents described in your `fluid.couchConfig` will be created.
```shell
grunt run-fluid-couch-config
```

Some feedback describing the various actions and results will be given. To disable this logging, add this line to your `fluid.couchConfig` setup file:
```js
fluid.setLogging(false);
```
