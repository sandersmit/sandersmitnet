var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var cp = require('child_process');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel'); 
var minifyjs = require('gulp-js-minify');
var uglifycss = require('gulp-uglifycss');
var rename = require("gulp-rename");
var gulp_remove_logging = require("gulp-remove-logging");
const jshint = require('gulp-jshint');
let uglify = require('gulp-uglify');



gulp.task("remove_logging", function() {
  return gulp.src("js/custom.js")
    .pipe(
      gulp_remove_logging({
        // Options (optional) 
        // eg: 
        // namespace: ['console', 'window.console'] 
      })
    )
    .pipe(
      gulp.dest(
        "dist/jsremovedlogs"
      )
    );
});

//use babel for ES6 minifier
gulp.task('minjs', () => {
  return gulp.src('./dist/jsremovedlogs/custom.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(rename('custom.min.js'))
    .pipe(gulp.dest('./dist/js'));
});


gulp.task('mincss', function () {
  gulp.src('./css/drupaltestsiteStyle.css')
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": false
    }))
    .pipe(rename('drupaltestsiteStyle.min.css'))
    .pipe(gulp.dest('./dist/css'));
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass'], function() {
    browserSync.init({
         port:9999,
        //proxy: "drupaltestsite.docksal",
        server: {
            baseDir: "./",
            index: "index.html"
        },
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        },
        ui: {
            port: 4000
        }
    });
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function() {
    return gulp.src('./scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(browserSync.reload({ stream: true }))
        .pipe(gulp.dest('./css'))  
});

gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(browserSync.reload({ stream: true }));
});


/**
 * @task clearcache
 * Clear all caches
 */
// gulp.task('clearcache', function(done) {
//   return cp.spawn('drush', ['cache-rebuild'], {stdio: 'inherit'})
//   .on('close', done);
// });

/**
 * @task reload
 * Refresh the page after clearing cache
 */
gulp.task('reload', function () {
  browserSync.reload();
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function() {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['scripts']);
    //gulp.watch(['templates/**/*.html.twig', '**/*.yml'], ['reload']);
    gulp.watch('html/*.html', ['reload']);
    gulp.watch('index.html', ['reload']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['browser-sync', 'watch']);
gulp.task('compress',['minjs','mincss']);



