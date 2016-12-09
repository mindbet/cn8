var gulp = require('gulp');
var compass = require('gulp-compass');
var sass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minifycss        = require('gulp-minify-css');
var uglify           = require('gulp-uglify');
var rename           = require('gulp-rename');
var concat           = require('gulp-concat');
var notify           = require('gulp-notify');
var livereload       = require('gulp-livereload');
var plumber          = require('gulp-plumber');
var path             = require('path');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserSync = require('browser-sync').create();



gulp.task('imagemin', function () {
    return gulp.src('./images-source/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./images'));
});




//the title and icon that will be used for the Grunt notifications
var notifyInfo = {
	title: 'Gulp',
	icon: path.join(__dirname, 'gulp.png')
};


//error notification settings for plumber
var plumberErrorHandler = { errorHandler: notify.onError({
		title: notifyInfo.title,
		icon: notifyInfo.icon,
		message: "Error: <%= error.message %>"
	})
};


gulp.task('sass', function() {
	return gulp.src(['./sass/**/*.scss'])
		.pipe(plumber(plumberErrorHandler))
		.pipe(compass({
			css: 'css',
			sass: 'sass',
			image: 'images'
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(gulp.dest('css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifycss())
		.pipe(gulp.dest('css'));
});


//Type "gulp" on the command line to watch file changes
gulp.task('default', function(){
  livereload.listen();
    gulp.watch('./sass/**/*.scss', ['sass']);
    gulp.watch('./js/*.js', ['uglify']);
    gulp.watch(['./css/style.css', './**/*.twig', './js_min/*.js'], function (files){
      livereload.changed(files)
    });
});
