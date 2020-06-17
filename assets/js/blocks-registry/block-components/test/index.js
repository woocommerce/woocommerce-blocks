/**
 * Internal dependencies
 */
import { getRegisteredBlockComponents, registerBlockComponent } from '../index';

describe( 'blocks registry', () => {
	const context = '@woocommerce/all-products';
	const blockName = '@woocommerce-extension/price-level';
	const component = () => {};

	describe( 'registerBlockComponent', () => {
		const invokeTest = ( args ) => () => {
			return registerBlockComponent( args );
		};
		it( 'throws an error when registered block is missing `blockName`', () => {
			expect( invokeTest( { context, blockName: null } ) ).toThrowError(
				/blockName/
			);
		} );
		it( 'throws an error when registered block is missing `component`', () => {
			expect(
				invokeTest( { context, blockName, component: null } )
			).toThrowError( /component/ );
		} );
	} );

	describe( 'getRegisteredBlockComponents', () => {
		it( 'gets an empty object when context has no inner blocks', () => {
			expect(
				getRegisteredBlockComponents( '@woocommerce/all-products' )
			).toEqual( {} );
		} );
		it( 'gets a block that was successfully registered', () => {
			registerBlockComponent( { context, blockName, component } );
			expect(
				getRegisteredBlockComponents( '@woocommerce/all-products' )
			).toEqual( { [ blockName ]: component } );
		} );
	} );
} );
