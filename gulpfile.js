'use-strict'



var gulp = require('gulp');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');


var path = {
    css: {
        src: 'app/src/scss/*/.scss',
        dest:'app/dist/css'
    },
    js: {
        src: 'app/src/js/*/.js',
        dest:'app/dist/js'
    },
    img: {
        src: 'app/src/img/*/{.png, .jpg, .svg}',
        dest:'app/dist'
    },
    html: {
        src: 'app/src/html/*/.html',
        dest:'app/dist/html'
    },

}


function styles() {
    return gulp
        .src(path.css.src)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest[path.css.dest])
        .pipe(browserSync.stream());
    
}


function js() {
    return gulp
        .src(path.js.src)
        .pipe(gulp.dest[path.js.dest])
        .pipe(browserSync.stream());
    
}


function img() {
    return gulp
        .src(path.img.src)
        .pipe(imagemin())
        .pipe(gulp.dest[path.img.dest])
        .pipe(browserSync.stream());
    
}


function html() {
    return gulp
        .src(path.html.src)
        .pipe(gulp.dest[path.html.dest])
        .pipe(browserSync.stream());
    
}

function watch() {
    browserSync.init({
        server: {
            baseDir:'./app/dist'
        }
    })
    gulp.watch(path.css.src, styles);
    gulp.watch(path.js.src, js);
    gulp.watch(path.html.src, html).on('change', browserSync.reload);
    gulp.watch(path.img.src, img);
}

exports.watch = watch;

var build = gulp.parallel(html, styles, js, img, watch);

gulp.task("default", build)