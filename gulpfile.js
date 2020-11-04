//load plugins
var gulp             = require('gulp'),
    compass          = require('gulp-compass'),
    pug              = require('gulp-pug'),
    autoprefixer     = require('gulp-autoprefixer'),
    cleancss         = require('gulp-clean-css'),
    uglify           = require('gulp-uglify'),
    merge            = require('merge-stream'),
    rename           = require('gulp-rename'),
    concat           = require('gulp-concat'),
    
    jimp             = require('gulp-jimp');


var path = {

    file:{
        csscompile: 'app/css/compile.scss',
        cssall: 'app/css/**/*.scss',
        jsall: 'app/js/**/*.js',
        layoutscompile: 'app/layouts/*.pug',
        layoutsall: 'app/layouts/**/*.pug',
        fonticons: 'app/fonticons/*.svg'
    },

    folder:{
        css: 'dist/assets/css/',
        fonts: 'dist/assets/fonts/',
        sass: 'app/css/',
        image: 'dist/assets/i/',
        js: 'dist/assets/js/',
        layouts: 'dist/',
        csstemplates: 'app/css/templates/'
    },

    filename:{
        css: 'website_styles',
        js: 'website_plugins.js',
        imgcrop: '-thumbnail'
    },

    settings: {
        imgcrop: { scale: 0.2, gaussian: 4 }
    }

}


gulp.task('css', function() {
    return gulp.src([path.file.csscompile])
        .pipe(compass({
            css: path.folder.css,
            sass: path.folder.sass,
            image: path.folder.image,
            font: path.folder.fonts
        }))
        .pipe(gulp.dest(path.folder.css))
        .pipe(cleancss({
          compatibility: 'ie8'
        }))
        .pipe(rename({
            basename: path.filename.css,
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.folder.css));
});




gulp.task('js', function() {
	return gulp.src([path.file.jsall])
		.pipe(concat(path.filename.js))
		.pipe(gulp.dest(path.folder.js))
		.pipe(rename({ suffix: '.min' }))
		// .pipe(uglify())
		.pipe(gulp.dest(path.folder.js));
});


gulp.task('layouts', function() {
  return gulp.src([path.file.layoutscompile])
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest(path.folder.layouts));
});



gulp.task('cropimg', function () {
    // gulp
    // .src(path.folder.image + 'Hirsch-Social.png')
    // .pipe(jimp({ [path.filename.imgcrop]: path.settings.imgcrop })).pipe(gulp.dest(path.folder.image));

});


// Watch
gulp.task('watch', function() {

	//watch .scss files
	gulp.watch(path.file.cssall, ['css']);

	//watch .js files
	gulp.watch(path.file.jsall, ['js']);

	// //watch .pug files
	gulp.watch(path.file.layoutsall, ['layouts']);

});


//default
gulp.task('default', [
    'css',
    'js',
    'layouts',
    // 'cropimg',
    'watch'
]);
