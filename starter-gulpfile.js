var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('sync', function() {
 browserSync.init({
 proxy: "my_project.dev",
 files: "*.css,*.php,css/*css"
});
});
