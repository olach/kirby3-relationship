import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import postcss from 'rollup-plugin-postcss';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';

const PRODUCTION = process.env.NODE_ENV === 'production';

export default {
	input: 'src/main.js',
	output: {
		file: 'index.js',
		format: 'iife'
	},
	plugins: [
		commonjs(),
		vue({
			css: false,
		}),
		babel(),
		minify({
			comments: !PRODUCTION,
			sourceMap: !PRODUCTION
		}),
		postcss({
			extract: true,
			minimize: PRODUCTION,
			sourceMap: PRODUCTION ? false : 'inline'
		})
	  ]
};
