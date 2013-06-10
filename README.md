# grunt-snockets-tree

This grunt plugin will build a concat tree for use with grunt's concat task by scanning for require's with snockets.

[Snockets](https://github.com/pthrasher/snockets)

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-snockets-tree`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-snockets-tree');
```

## Documentation (Basic Usage)
**grunt conifg**
```javascript
grunt.initConfig({
  snockets: {
    compile: {
      options: {
        minify: 'uglify'
      },
      src: 'app/app.js',
      dest: 'public/js/app.js'
    }
  }
})
```

## Options

### minify
Type: `Boolean`
Default: false

Specifies the type of minification we should use. This will set a grunt config object with a key of this value.
