const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const babel = require("gulp-babel");
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const cssmin = require('gulp-cssmin')
const htmlmin = require('gulp-htmlmin');
const del = require('del')
const path = require('path')

const project = {

    js: {
        src: 'src',
        dest: 'public/js'
    },
    css: {
        src: 'client/css',
        dest: 'public/css'
    }
}

gulp.task('default', ['jsmin', 'cssmin', 'start'])

gulp.task('build', ['jsmin', 'cssmin'])

gulp.task('start', function () {
    nodemon({
        script: 'bin/dev',
        ext: 'js css ejs',
        ignore: ['public', 'logs'],
        tasks: function (files) {
            var tasks = []
            files.forEach(function (file) {
                if (path.relative(client.js.src, file).substr(0, 2) !== '..'
                    && !~tasks.indexOf('jsmin')) {
                    tasks.push('jsmin')
                }
                if (path.relative(client.css.src, file).substr(0, 2) !== '..'
                    && !~tasks.indexOf('cssmin')) {
                    tasks.push('cssmin')
                }
            })
            return tasks
        }
    })
})

gulp.task('cleanjs', function () {
    return del([client.js.dest])
})

gulp.task('cleancss', function () {
    return del([client.css.dest])
})

gulp.task('jsmin', ['cleanjs'], function () {
    return gulp.src(client.js.src + '/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('graph.js'))
        .pipe(uglify())
        .pipe(gulp.dest(client.js.dest))
})

gulp.task('cssmin', ['cleancss'], function () {
    return gulp.src(client.css.src + '/**/*.css')
        .pipe(concat('style.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(client.css.dest))
})

gulp.task('htmlmin', function () {
    return gulp.src('views' + '/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/views'));
});

gulp.task("babel", function () {
    return gulp.src('app' + '/**/*.js')
        .pipe(babel())
        // .pipe(uglify())
        .pipe(gulp.dest("dist/app"));
});