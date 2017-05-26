var npsUtils = require('nps-utils')

var src = {
	js: 'src/app.module.js',
	css: 'src/assets/scss/style.scss'
}

var dist = {
	js: 'dist/app.js',
	css: 'dist/assets/css/style.css'
}

var scripts = {
	default: npsUtils.concurrent.nps('serve', 'build.watch'),

	build: {
		default: npsUtils.series.nps('clean', 'build.js.min', 'build.css.min', 'build.html.index', 'build.images'),
		watch: npsUtils.concurrent.nps('build.js.watch', 'build.css.watch', 'build.html.index.watch', 'build.images.watch'),

		js: {
			default: npsUtils.mkdirp('dist') + ' && browserify '+ src.js +' -o '+ dist.js,
			watch: npsUtils.mkdirp('dist') + ' && watchify --debug '+ src.js +' -o '+ dist.js,
			min: npsUtils.mkdirp('dist') + ' && browserify -g uglifyify '+ src.js +' -o '+ dist.js,
		},

		css: {
			default: 'node-sass '+ src.css +' '+ dist.css,
			watch: 'nps build.css && nps "build.css -wr"',
			min: 'nps "build.css --output-style compressed"'
		},

		html: {
			default: 'cpx "src/**/*.html" dist',
			watch: 'nps "build.html --watch"',
			index: {
				default: 'cpx "src/index.html" dist',
				watch: 'nps "build.html.index --watch"'
			}
		},

		images: {
			default: 'cpx "src/**/*.{png,jpg,svg}" dist',
			watch: 'nps "build.images --watch"'
		}
	},

	clean: npsUtils.rimraf('dist/*'),

	serve: {
		default: 'browser-sync start -s dist -f "dist/**/*.html, '+ dist.css +', '+ dist.js +'" --no-ui --no-online --open local -b chrome',
		new: npsUtils.runInNewWindow('nps serve')
	},

	deploy: {
		default: 'gh-pages -d dist'
	}
}

module.exports = { scripts: scripts }
