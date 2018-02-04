'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
 
gulp.task('views', () => 
    gulp.src('src/pug/*.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('public'))
        .pipe(browserSync.stream())
);

gulp.task('styles', () =>
    gulp.src('src/scss/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
        }))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream())
);

gulp.task('scripts', () =>
	gulp.src('src/js/*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.stream())
);

gulp.task('images', () =>
    gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'))
        .pipe(browserSync.stream())
);

gulp.task('browserSync', () => 
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    })
);

gulp.task('watch', function(){
    gulp.watch('src/pug/**/*.pug', ['views']);
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/img/**/*', ['images']);
})

gulp.task('default', ['views', 'styles', 'scripts', 'images']);
gulp.task('dev', ['default', 'browserSync', 'watch']);