var gulp = require('gulp')
var px2rem = require('postcss-px2rem')
var postcss = require('gulp-postcss')
var clean = require('gulp-clean')

gulp.task('clean', () => {
    return gulp.src('dist', {read: true})
        .pipe(clean())
})

gulp.task('css', () => {
    var processors = [px2rem({remUnit: 75})]
    return gulp.src('./src/css/**/*.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('dist/css'))
});
// gulp.task('html', fun())
gulp.task('default', ['clean', 'css'], function(){
    console.log("gulp-->defallt...");
});