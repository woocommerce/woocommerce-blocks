/**
 * External dependencies
 */
import { RuleTester } from 'eslint';

/**
 * Internal dependencies
 */
import rule from '../feature-flag';

const ruleTester = new RuleTester( {
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 6,
	},
} );

ruleTester.run( 'feature-flag', rule, {
	valid: [
		{
			code: `
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE === 'experimental' ) {
    registerBlockType( 'woocommerce/checkout', settings );
}`,
		},
	],
	invalid: [
		{
			code: `
if ( WOOCOMMERCE_BLOCKS_PHASE === 'experimental' ) {
    registerBlockType( 'woocommerce/checkout', settings );
}`,
			errors: [
				{
					message: 'accessedViaEnv',
				},
			],
			output: `
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE === 'experimental' ) {
    registerBlockType( 'woocommerce/checkout', settings );
}`,
		},
		{
			code: `
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE !== 'experimental' ) {
    registerBlockType( 'woocommerce/checkout', settings );
}`,
			errors: [
				{
					message: 'equalOperator',
				},
			],
			output: `
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE === 'experimental' ) {
    registerBlockType( 'woocommerce/checkout', settings );
}`,
		},
		{
			code: `
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE == 'experimental' ) {
    registerBlockType( 'woocommerce/checkout', settings );
}`,
			errors: [
				{
					message: 'equalOperator',
				},
			],
			output: `
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE === 'experimental' ) {
    registerBlockType( 'woocommerce/checkout', settings );
}`,
		},
		{
			code: `
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE > 'experimental' ) {
    registerBlockType( 'woocommerce/checkout', settings );
}`,
			errors: [
				{
					message: 'equalOperator',
				},
			],
			output: `
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE === 'experimental' ) {
    registerBlockType( 'woocommerce/checkout', settings );
}`,
		},
		{
			code: `
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE === 'core' ) {
    registerBlockType( 'woocommerce/checkout', settings );
}`,
			errors: [
				{
					message: 'whiteListedFlag',
				},
			],
			output: `
if ( process.env.WOOCOMMERCE_BLOCKS_PHASE === 'experimental' ) {
    registerBlockType( 'woocommerce/checkout', settings );
}`,
		},
		{
			code: `
const featureFlag = process.env.WOOCOMMERCE_BLOCKS_PHASE === 'experimental'`,
			errors: [
				{
					message: 'noTernary',
				},
			],
		},
	],
} );
