# grunt-chinstrap

> A grunt plugin to compile chinstrap plugins

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-chinstrap --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-chinstrap');
```

## The "chinstrap" task

### Overview
In your project's Gruntfile, add a section named `chinstrap` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  chinstrap: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.wrap
Type: `String`
Default value: `null`

We're assuming you have a bunch of template files you want to compile into a JavaScript object. By default, this will pop out as a name/value pair of "base-name of the template file: compiled function". We assume you'll want to insert this into your app with some code. `wrap` is a little pattern string to add your callback. Set it to a string, and use `***` to represent where the templates will go.

Ex:

```js
wrap: 'MyApp.importTemplates(***);'
```

#### options.skipRender
Type: `Boolean`
Default value: `false`

We find chinstrap can be handy for bundling up plain text files, in addition to templates. This option lets you skip the template rendering step and gives you the same bundling and wrapping.

Note: You probably won't use this much.

#### options.banner
Type: `String'
Default value: `"/* Compiled with Chinstrap version ' + VERSION + ' ' + new Date().toString() + '*/\n\n'"`

This will be pasted at the top of the generated file. Default is the current Chinstrap version used, and a timestamp. Simple as that.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  chinstrap: {
    options: {},
    main: {
      src: ['/src/modules/**/*.template.html'],
      dest: 'public/build/js/templates.js'
    }
  }
})
```

#### Custom Options


```js
grunt.initConfig({
  chinstrap: {
    options: {
      wrap: 'BookApp.importTemplateData(***);'
    },
    main: {
      src: ['/src/modules/**/*.template.html']
      dest: 'public/build/js/templates.js'
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
