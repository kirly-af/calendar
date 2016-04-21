gulp = require 'gulp'
plug = (require 'gulp-load-plugins')()
runSeq = require 'run-sequence'
merge = require 'merge-stream'
browserSync = (require 'browser-sync').create()
logger  = (require 'morgan')('dev')
dotenv = require 'dotenv'
conf = (require 'CSON').requireFile '.gulpconfig'
argv = (require 'yargs').argv

# NODE_ENV default value is development
process.env.NODE_ENV ?= 'development'
# NODE_ENV is set to production if --production is passed
process.env.NODE_ENV = 'production' if argv.production

DEV = process.env.NODE_ENV is 'development'
PROD = not DEV
PATHS = conf.paths
ERROR_HANDLER = plug.notify.onError "Error: <%= error.message %>" if DEV

dotenv.config path: ".env.#{process.env.NODE_ENV}"

# Default task; start local server & watch for changes.
gulp.task 'default', ['dev']

gulp.task 'dev', (done) -> runSeq 'build', 'serve', done

gulp.task 'build', ['assets', 'scripts', 'styles', 'templates']

# Lint JS
gulp.task 'scripts:lint', ->
  gulp.src PATHS.scripts.all
    .pipe plug.plumber errorHandler: ERROR_HANDLER
    .pipe plug.cached 'lintjs'
    .pipe plug.eslint()
    .pipe plug.eslint.format()
    # .pipe plug.eslint.failAfterError()

# Preprocess scripts, bundle if PROD env
gulp.task 'scripts', ['scripts:lint'], ->
  SRC = if DEV then PATHS.scripts.all else PATHS.scripts.main
  gulp.src SRC
    .pipe plug.plumber errorHandler: ERROR_HANDLER
    .pipe plug.if(PROD, plug.jspm
      selfExecutingBundle: true
      skipSourceMaps: true
    )
    .pipe plug.preprocess()
    .pipe plug.if(PROD, plug.ngAnnotate())
    .pipe plug.if(PROD, plug.uglify())
    .pipe plug.if(PROD, plug.rename 'app.js')
    .pipe plug.if(PROD, plug.size title: 'scripts')
    .pipe gulp.dest PATHS.dst

# Lint SASS
gulp.task 'styles:lint', ->
  gulp.src PATHS.styles.all
    .pipe plug.plumber errorHandler: ERROR_HANDLER
    .pipe plug.cached 'styles:lint'
    .pipe plug.sassLint()
    .pipe plug.sassLint.format()
    .pipe plug.sassLint.failOnError()

# Compile SASS with sourcemaps + livereload.
sassJspm = require 'sass-jspm-importer'
sassOptions =
  errLogToConsole: true
  outputStyle: 'expanded'
  functions: sassJspm.resolve_function PATHS.assets.vendor.dst
  importer: sassJspm.importer
autoprefixerTargets = [
  'last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
]
gulp.task 'styles', ['styles:lint'], ->
  gulp.src PATHS.styles.main
    .pipe plug.plumber errorHandler: ERROR_HANDLER
    .pipe plug.if(DEV, plug.sourcemaps.init())
      .pipe plug.sass(sassOptions).on('error', plug.sass.logError)
      .pipe plug.autoprefixer browsers: autoprefixerTargets
      .pipe plug.if(PROD, plug.cssnano())
      .pipe plug.rename 'all.css'
    .pipe plug.if(DEV, plug.sourcemaps.write '.')
    .pipe plug.if(PROD, plug.size title: 'styles')
    .pipe gulp.dest PATHS.dst
    .pipe plug.if(DEV, browserSync.stream match: "#{PATHS.dst}/all.css")

# Pug templates compilation.
gulp.task 'templates', ->
  gulp.src PATHS.templates.main
    .pipe plug.plumber errorHandler: ERROR_HANDLER
    .pipe plug.pugLint()
    .pipe plug.data -> process.env
    .pipe plug.pug()
    .pipe plug.if(PROD, plug.htmlmin collapseWhitespace: true)
    .pipe plug.if(PROD, plug.size title: 'templates')
    .pipe gulp.dest PATHS.dst


resolveJspmAssets = (assetPath) ->
  return assetPath if assetPath.search('jspm:') isnt 0
  tmp = assetPath.split('jspm:')[1].split('/')
  tmp[0] += '*'
  return "#{PATHS.jspm}/**/#{tmp.join '/'}"

gulp.task 'assets:vendor', ->
  SRC = PATHS.assets.vendor.src.map resolveJspmAssets
  gulp.src SRC
    .pipe plug.if(PROD, plug.size title: 'vendor assets')
    .pipe gulp.dest "#{PATHS.dst}/#{PATHS.assets.vendor.dst}"

pngquant = require 'imagemin-pngquant'
gulp.task 'assets:app', ->
  imgFilter = plug.filter ["#{PATHS.assets}/img/**"], restore: 'true'
  gulp.src PATHS.assets.app
    .pipe imgFilter
    .pipe plug.if(PROD, plug.imagemin
      progressive: true
      optimizationLevel: 3
      svgoPlugins: [removeViewBox: false]
      use: [pngquant()]
    )
  .pipe imgFilter.restore
  .pipe plug.if(PROD, plug.size title: 'assets')
  .pipe gulp.dest "#{PATHS.dst}/assets"

gulp.task 'assets', ['assets:app', 'assets:vendor']

# Start local dev server.
gulp.task 'serve', ['watch'], (done) ->
  browserSync.init
    https: process.env.HTTPS is "true"
    middleware: [logger]
    open: false
    port: process.env.PORT or 8080
    server:
      baseDir: ['.', PATHS.dst]
  done()

gulp.task 'reload', (done) ->
  browserSync.reload()
  done()

gulp.task 'watch', (done) ->
  gulp.watch [PATHS.scripts.all], ['scripts', 'reload']
  gulp.watch [PATHS.styles.all], ['styles']
  gulp.watch [PATHS.templates.all], ['templates', 'reload']
  gulp.watch [PATHS.assets.app], ['assets', 'reload']
  done()

del = require 'del'
gulp.task 'clean', -> del ["#{PATHS.dst}/*"]

gulp.task 'rebuild', (done) -> runSeq 'clean', 'build', done
