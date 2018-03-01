var gulp = require('gulp'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    webserver = require('gulp-webserver');

var outputBuilds,
    sassOutputStyle, 
    sassSources;

outputBuilds = 'builds/development/';
sassSources = ['sass/style.scss'];


gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'sass',
      css: outputBuilds + 'css',
      style: sassOutputStyle
    })
    .on('error', gutil.log))
    .pipe(gulp.dest( outputBuilds + 'css'))
    .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(['sass/*.scss', 'sass/*/*.scss'], ['compass']);    
    gulp.watch([outputBuilds + '/**/*.html'], ['html']);
});

gulp.task('webserver', function() {
    gulp.src(outputBuilds + '/')
        .pipe(webserver({
            port: 3000,
            livereload: true,
            livereloadport: 8888,
            open: true
        }));
});

gulp.task('html', function() {
    //gulp.src('builds/development/*.html')
    gulp.src(outputBuilds + '/**/*.html') 
    .pipe(connect.reload())
});


gulp.task('default', ['watch', 'html', 'compass', 'webserver']);