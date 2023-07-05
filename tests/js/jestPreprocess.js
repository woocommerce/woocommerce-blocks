const babelOptions = {
	presets: [ '@wordpress/babel-preset-default' ],
	plugins: [
		'explicit-exports-references',
		'@babel/plugin-proposal-optional-chaining',
		'@babel/plugin-proposal-class-properties',
	],
};

module.exports =
	require( 'babel-jest' ).default.createTransformer( babelOptions );
