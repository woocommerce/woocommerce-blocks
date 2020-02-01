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
		},
	],
} );
