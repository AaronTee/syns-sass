var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var sourceMap = require('gulp-sourcemaps');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var sassVariables = require('gulp-sass-variables');
const util = require('util');

var config = {
    _sassFilePath: 'themes/**/*.scss',
    _contentFiles: ['images/**/*', 'vendors/**/*', 'vendors-extensions/**/*.css'],
    _outputDir: (argv.outputDir || "") + (argv.outputDir ? "/" : "") + "dist",
    _buildSourceMap: argv.sourcemap,
    _sassProjectName: argv.projectName
}

gulp.task('build', function() {
    console.log('Build configuration: ' + util.inspect(config, false, null));
    gulp.start('Copy content files', 'build:sass');
});

gulp.task('Copy content files', function() {
    gulp.src(config._contentFiles, {base: '.'}).pipe(gulp.dest(config._outputDir));
});

gulp.task('build:sass', function() {
    return gulp.src(config._sassFilePath)
    .pipe(gulpif(config._buildSourceMap, sourceMap.init()))
    .pipe(gulpif(config._sassProjectName, sassVariables({
        "$project-name": config._sassProjectName
    })))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulpif(config._buildSourceMap, sourceMap.write('.')))
    .pipe(gulp.dest(config._outputDir))
});

gulp.task('watch', function() {
    gulp.watch(config._sassFilePath, ['build']);
});

gulp.task('clean', function() {
    console.log('Cleaning build folder: ' + util.inspect(config._outputDir, false, null));
    return gulp.src(config._outputDir)
    .pipe(clean())
});