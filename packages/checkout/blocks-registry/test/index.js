/**
 * Internal dependencies
 */
import {
	getRegisteredBlocks,
	registerCheckoutBlock,
	innerBlockAreas,
} from '../index';

describe( 'checkout blocks registry', () => {
	const component = () => {
		return null;
	};

	describe( 'registerCheckoutBlock', () => {
		const invokeTest = ( blockName, options ) => () => {
			return registerCheckoutBlock( blockName, options );
		};
		it( 'throws an error when registered block is missing `blockName`', () => {
			expect(
				invokeTest( { metadata: { name: null }, component } )
			).toThrowError( /blockName/ );
			expect(
				invokeTest( { metadata: { name: '' }, component } )
			).toThrowError( /blockName/ );
		} );
		it( 'throws an error when registered block is missing `component`', () => {
			expect(
				invokeTest( {
					metadata: { name: 'test/block-name' },
					component,
				} )
			).toThrowError( /component/ );
		} );
	} );

	describe( 'getRegisteredBlocks', () => {
		it( 'gets an empty array when checkout area has no registered blocks', () => {
			expect(
				getRegisteredBlocks( innerBlockAreas.CHECKOUT_FIELDS )
			).toEqual( [] );
		} );
		it( 'gets an empty array when the area is not defined', () => {
			expect( getRegisteredBlocks( 'not-defined' ) ).toEqual( [] );
		} );
	} );
} );
