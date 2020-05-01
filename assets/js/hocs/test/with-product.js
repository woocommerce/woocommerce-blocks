/**
 * External dependencies
 */
import { create, act } from 'react-test-renderer';

/**
 * Internal dependencies
 */
import withProduct from '../with-product';
import * as mockUtils from '../../components/utils';
import * as mockBaseUtils from '../../base/utils/errors';

jest.mock( '../../components/utils' );
jest.mock( '../../base/utils/errors' );

const mockProduct = { id: 1, name: 'T-Shirt' };
const attributes = { productId: 1 };
const TestComponent = withProduct( ( props ) => {
	return (
		<div
			error={ props.error }
			getProduct={ props.getProduct }
			isLoading={ props.isLoading }
			product={ props.product }
		/>
	);
} );

describe( 'withProduct Component', () => {
	let component;

	describe( 'when the API returns product data', () => {
		beforeEach( async () => {
			mockUtils.getProduct.mockResolvedValue( mockProduct );

			await act( async () => {
				component = create(
					<TestComponent attributes={ attributes } />
				);
			} );
		} );

		it( 'sets the product props', () => {
			const props = component.root.findByType( 'div' ).props;

			expect( props.error ).toBeNull();
			expect( typeof props.getProduct ).toBe( 'function' );
			expect( props.isLoading ).toBe( false );
			expect( props.product ).toEqual( {
				...mockProduct,
			} );
		} );
	} );

	describe( 'when the API returns an error', () => {
		const error = { message: 'There was an error.' };
		const formattedError = { message: 'There was an error.', type: 'api' };

		beforeEach( async () => {
			mockUtils.getProduct.mockRejectedValue( error );
			mockBaseUtils.formatError.mockReturnValue( formattedError );

			await act( async () => {
				component = create(
					<TestComponent attributes={ attributes } />
				);
			} );
		} );

		it( 'sets the error prop', async () => {
			const { formatError } = mockBaseUtils;
			const props = component.root.findByType( 'div' ).props;

			expect( formatError ).toHaveBeenCalledWith( error );
			expect( formatError ).toHaveBeenCalledTimes( 1 );
			expect( props.error ).toEqual( formattedError );
			expect( typeof props.getProduct ).toBe( 'function' );
			expect( props.isLoading ).toBe( false );
			expect( props.product ).toBeNull();
		} );
	} );
} );
