'use strict';

// Include Gulp and other build automation tools and utilities
// See: https://github.com/gulpjs/gulp/blob/master/docs/API.md
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var path = require('path');
var merge = require('merge-stream');
var runSequence = require('run-sequence');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
var fs = require('fs');
var url = require('url');
var ReactTools = require('react-tools');
var rename = require('gulp-rename');
var argv = require('minimist')(process.argv.slice(2));

// Settings
var NOW = Date.now();
var DEST = './build';                         // The build output folder
var RELEASE = !!argv.release;                 // Minimize and optimize during a build?
var GOOGLE_ANALYTICS_ID = 'UA-XXXXX-X';       // https://www.google.com/analytics/web/
var AUTOPREFIXER_BROWSERS = [                 // https://github.com/ai/autoprefixer
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

var src = {};
var watch = false;
var pkgs = (function() {
  var pkgs = {};
  var map = function(source) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        pkgs[key.replace(/[^a-z0-9]/gi, '')] = source[key].substring(1);
      }
    }
  };
  map(require('./package.json').dependencies);
  return pkgs;
}());

// Configure JSX Harmony transform in order to be able
// require .js files with JSX (see 'pages' task)
var originalJsTransform = require.extensions['.js'];
var reactTransform = function(module, filename) {
  if (filename.indexOf('node_modules') === -1) {
    var src = fs.readFileSync(filename, {encoding: 'utf8'});
    src = ReactTools.transform(src, {harmony: true, stripTypes: true});
    module._compile(src, filename);
  } else {
    originalJsTransform(module, filename);
  }
};
require.extensions['.js'] = reactTransform;

// The default task
gulp.task('default', ['serve']);

// Clean up
gulp.task('clean', del.bind(null, [DEST]));

// 3rd party libraries
gulp.task('vendor', function() {
  return merge(
    //gulp.src('./node_modules/jquery/dist/**')
      //.pipe(gulp.dest(DEST + '/vendor/jquery-' + pkgs.jquery)),
    gulp.src('./node_modules/bootstrap/dist/fonts/**')
      .pipe(gulp.dest(DEST + '/fonts'))
  );
});

// Static files
gulp.task('assets', function() {
  src.assets = 'assets/assets/**';
  return gulp.src(src.assets)
    .pipe($.changed(DEST))
    .pipe(gulp.dest(DEST))
    .pipe($.size({title: 'assets'}));
});

// Images
gulp.task('images', function() {
  src.images = 'assets/images/**';
  return gulp.src(src.images)
    .pipe($.changed(DEST + '/images'))
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(DEST + '/images'))
    .pipe($.size({title: 'images'}));
});

// HTML pages
gulp.task('pages', function() {
  src.pages = ['src/components/pages/*.html'];

  return gulp.src(src.pages)
    .pipe($.changed(DEST, {extension: '.html'}))
    .pipe($.replace('UA-XXXXX-X', GOOGLE_ANALYTICS_ID))
    .pipe($.replace('APP.JS', 'app-' + NOW + '.js'))
    .pipe($.replace('BOOTSTRAP.CSS', 'css/bootstrap-' + NOW + '.css'))
    .pipe($.if(RELEASE, $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      minifyJS: true
    }), $.jsbeautifier()))
    .pipe(gulp.dest(DEST))
    .pipe($.size({title: 'pages'}));
});

// CSS style sheets
gulp.task('styles', function() {
  src.styles = 'assets/styles/**/*.{css,less}';
  return gulp.src('assets/styles/bootstrap.less')
    .pipe($.plumber())
    .pipe($.less({
      sourceMap: !RELEASE,
      sourceMapBasepath: __dirname
    }))
    .on('error', console.error.bind(console))
    .pipe($.autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe($.csscomb())
    .pipe($.if(RELEASE, $.minifyCss()))
    .pipe(rename('bootstrap-' + NOW + '.css'))
    .pipe(gulp.dest(DEST + '/css'))
    .pipe($.size({title: 'styles'}));
});

// Bundle
gulp.task('bundle', function(cb) {
  var started = false;
  var config = require('./config/webpack.js')(RELEASE, NOW);
  var bundler = webpack(config);

  function bundle(err, stats) {
    if (err) {
      throw new $.util.PluginError('webpack', err);
    }

    if (argv.verbose) {
      $.util.log('[webpack]', stats.toString({colors: true}));
    }

    if (!started) {
      started = true;
      return cb();
    }
  }

  if (watch) {
    bundler.watch(200, bundle);
  } else {
    bundler.run(bundle);
  }
});

// Build the app from source code
gulp.task('build', ['clean'], function(cb) {
  runSequence(['vendor', 'assets', 'images', 'pages', 'styles', 'bundle'], cb);
});

// Launch a lightweight HTTP Server
gulp.task('serve', function(cb) {

  watch = true;

  runSequence('build', function() {
    browserSync({
      notify: false,
      // Customize the BrowserSync console logging prefix
      logPrefix: 'RSK',
      // Run as an https by uncommenting 'https: true'
      // Note: this uses an unsigned certificate which on first access
      //       will present a certificate warning in the browser.
      // https: true,
      server: {
        baseDir: DEST,
        // Allow web page requests without .html file extension in URLs
        middleware: function(req, res, cb) {
          var uri = url.parse(req.url);
          if (uri.pathname.length > 1 &&
            uri.pathname.lastIndexOf('/browser-sync/', 0) !== 0 &&
            !fs.existsSync(DEST + uri.pathname)) {
            if (fs.existsSync(DEST + uri.pathname + '.html')) {
              req.url = uri.pathname + '.html' + (uri.search || '');
            } else {
              res.statusCode = 404;
              req.url = '/404.html' + (uri.search || '');
            }
          }
          cb();
        }
      }
    });

    gulp.watch(src.assets, ['assets']);
    gulp.watch(src.images, ['images']);
    gulp.watch(src.pages, ['pages']);
    gulp.watch(src.styles, ['styles']);
    gulp.watch(DEST + '/**/*.*', function(file) {
      browserSync.reload(path.relative(__dirname, file.path));
    });
    cb();
  });
});

// Run PageSpeed Insights
gulp.task('pagespeed', function(cb) {
  // Update the below URL to the public URL of your site
  pagespeed.output('reactive.innobis.cl', {
    strategy: 'mobile'
    // By default we use the PageSpeed Insights free (no API key) tier.
    // Use a Google Developer API key if you have one: http://goo.gl/RkN0vE
    // key: 'YOUR_API_KEY'
  }, cb);
});
