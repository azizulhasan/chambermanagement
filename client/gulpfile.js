'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss'); //For Compiling tailwind utilities with tailwind config

const tailwindConfig = require('./tailwind.config.js');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
gulp.task('sass', async function () {
    gulp.src('./public/assets/front/scss/**/*.scss').pipe(
        gulp.dest('./public/assets/front/css')
    );
});

gulp.task('tailwind', async function () {
    gulp.src(`./public/assets/front/scss/tailwind.css`)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([tailwindcss(tailwindConfig)]))
        // .pipe(concat({ path: 'style.css' }))
        // .pipe(autoprefixer({
        //     browsers: ['last 99 versions'],
        //     cascade: false
        // }))
        .pipe(gulp.dest('./public/assets/front/css'))
        .pipe(sass().on('error', sass.logError));
});

gulp.task('watch', async function () {
    gulp.watch('./public/assets/front/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch(
        './public/assets/front/scss/tailwind.css',
        gulp.parallel('tailwind')
    );
});
