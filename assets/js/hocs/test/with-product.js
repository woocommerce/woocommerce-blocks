/**
 * External dependencies
 */
import TestRenderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import withProduct from '../with-product';
import * as mockUtils from '../../components/utils';

// Mock the getProduct functions for tests.
jest.mock( '../../components/utils', () => ( {
	getProduct: jest.fn().mockImplementation(
		() => Promise.resolve()
	),
} ) );

const mockProduct = { name: 'T-Shirt' };
const attributes = { productId: 1 };
const TestComponent = withProduct( ( props ) => {
	return <div
		error={ props.error }
		getProduct={ props.getProduct }
		isLoading={ props.isLoading }
		product={ props.product }
	/>;
} );
const render = () => {
	return TestRenderer.create(
		<TestComponent
			attributes={ attributes }
		/>
	);
};

describe( 'withProduct Component', () => {
	afterEach( () => {
		mockUtils.getProduct.mockClear();
	} );

	describe( 'lifecycle events', () => {
		const renderer = render();

		it( 'getProduct is called on mount with passed in product id', () => {
			const { getProduct } = mockUtils;

			expect( getProduct ).toHaveBeenCalledWith( attributes.productId );
			expect( getProduct ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'getProduct is hooked to the prop', () => {
			const { getProduct } = mockUtils;
			const props = renderer.root.findByType( 'div' ).props;

			props.getProduct();

			expect( getProduct ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( 'when the API returns product data', () => {
		mockUtils.getProduct.mockImplementation(
			( productId ) => Promise.resolve( { ...mockProduct, id: productId } )
		);
		const renderer = render();

		it( 'sets the product props', () => {
			const props = renderer.root.findByType( 'div' ).props;

			expect( props.error ).toEqual( null );
			expect( typeof props.getProduct ).toEqual( 'function' );
			expect( props.isLoading ).toEqual( false );
			expect( props.product ).toEqual( { ...mockProduct, id: attributes.productId } );
		} );

		mockUtils.getProduct.mockReset();
	} );

	describe( 'when the API returns an error', () => {
		mockUtils.getProduct.mockImplementation(
			() => Promise.reject( { message: 'There was an error.' } )
		);
		const renderer = render();

		it( 'sets the error prop', () => {
			const props = renderer.root.findByType( 'div' ).props;

			expect( props.error ).toEqual( { apiMessage: 'There was an error.' } );
			expect( typeof props.getProduct ).toEqual( 'function' );
			expect( props.isLoading ).toEqual( false );
			expect( props.product ).toEqual( null );
		} );
	} );
} );
