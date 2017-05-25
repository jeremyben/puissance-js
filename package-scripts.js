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
		default: npsUtils.series.nps('clean', 'build.js', 'build.css', 'build.other'),
		watch: npsUtils.concurrent.nps('build.js.watch', 'build.css.watch', 'build.other.watch'),

		js: {
			default: 'browserify '+ src.js +' -o '+ dist.js,
			watch: 'watchify --debug '+ src.js +' -o '+ dist.js
		},

		css: {
			default: 'node-sass '+ src.css +' '+ dist.css,
			watch: 'nps build.css && nps "build.css -wr"',
			prod: 'nps "build.css --output-style compressed"'
		},

		other: {
			default: 'cpx "src/**/*.{html,png,jpg,svg}" dist',
			watch: 'nps "build.other --watch"'
		}
	},

	clean: npsUtils.rimraf('dist/*'),

	serve: {
		default: 'browser-sync start -s dist -f "dist/**/*.html, '+ dist.css +', '+ dist.js +'" --no-ui --no-online --open local -b chrome',
		new: npsUtils.runInNewWindow('nps serve')
	}
}

module.exports = { scripts: scripts }
