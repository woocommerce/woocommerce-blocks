/**
 * External dependencies
 */
import TestRenderer from 'react-test-renderer';

/**
 * Internal dependencies
 */
import withReviews from '../with-reviews';
import * as mockUtils from '../../../blocks/reviews/utils';

jest.mock( '../../../blocks/reviews/utils', () => ( {
	getReviews: jest.fn(),
	getOrderArgs: () => ( {
		order: 'desc',
		orderby: 'date_gmt',
	} ),
} ) );

const mockReviews = [
	{ reviewer: 'Alice', review: 'Lorem ipsum', rating: 2 },
	{ reviewer: 'Bob', review: 'Dolor sit amet', rating: 3 },
	{ reviewer: 'Carol', review: 'Consectetur adipiscing elit', rating: 5 },
	{ reviewer: 'Dan', review: 'Sed do eiusmod tempor incididunt', rating: 4 },
];
const attributes = {
	orderby: 'most-recent',
	productId: 1,
	reviewsOnPageLoad: 2,
	reviewsOnLoadMore: 2,
};
const defaultArgs = {
	order: 'desc',
	orderby: 'date_gmt',
	per_page: 2,
	product_id: 1,
};
const TestComponent = withReviews( ( props ) => {
	return <div
		error={ props.error }
		getReviews={ props.getReviews }
		appendReviews={ props.appendReviews }
		onChangeArgs={ props.onChangeArgs }
		isLoading={ props.isLoading }
		reviews={ props.reviews }
		totalReviews={ props.totalReviews }
	/>;
} );
const render = () => {
	return TestRenderer.create(
		<TestComponent
			attributes={ attributes }
		/>
	);
};

describe( 'withReviews Component', () => {
	let renderer;
	afterEach( () => {
		mockUtils.getReviews.mockReset();
	} );

	describe( 'lifecycle events', () => {
		beforeEach( () => {
			mockUtils.getReviews.mockImplementation( () => Promise.resolve() );
			renderer = render();
		} );

		it( 'getReviews is called on mount with default args', () => {
			const { getReviews } = mockUtils;

			expect( getReviews ).toHaveBeenCalledWith( defaultArgs );
			expect( getReviews ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'getReviews is hooked to the prop', () => {
			const { getReviews } = mockUtils;
			const props = renderer.root.findByType( 'div' ).props;

			props.getReviews();

			expect( getReviews ).toHaveBeenCalledTimes( 2 );
		} );
	} );

	describe( 'when the API returns product data', () => {
		beforeEach( () => {
			mockUtils.getReviews.mockImplementationOnce(
				() => Promise.resolve( { reviews: mockReviews.slice( 0, 2 ), totalReviews: mockReviews.length } )
			).mockImplementationOnce(
				() => Promise.resolve( { reviews: mockReviews.slice( 2, 4 ), totalReviews: mockReviews.length } )
			);
			renderer = render();
		} );

		it( 'sets reviews on componentDidMount', () => {
			const props = renderer.root.findByType( 'div' ).props;

			expect( props.error ).toBeNull();
			expect( typeof props.getReviews ).toBe( 'function' );
			expect( typeof props.appendReviews ).toBe( 'function' );
			expect( typeof props.onChangeArgs ).toBe( 'function' );
			expect( props.isLoading ).toBe( false );
			expect( props.reviews ).toEqual( mockReviews.slice( 0, 2 ) );
			expect( props.totalReviews ).toEqual( mockReviews.length );
		} );

		it( 'sets new reviews on onChangeArgs', () => {
			const { getReviews } = mockUtils;
			const props = renderer.root.findByType( 'div' ).props;

			props.onChangeArgs( {
				order: 'desc',
				orderby: 'rating',
			} );

			setTimeout( () => {
				expect( getReviews ).toHaveBeenCalledTimes( 2 );
				expect( props.reviews ).toEqual( mockReviews.slice( 2, 4 ) );
				expect( props.totalReviews ).toEqual( mockReviews.length );
			} );
		} );

		it( 'appends new reviews on appendReviews', () => {
			const { getReviews } = mockUtils;
			const props = renderer.root.findByType( 'div' ).props;

			props.appendReviews();

			setTimeout( () => {
				expect( getReviews ).toHaveBeenCalledTimes( 2 );
				expect( props.reviews ).toEqual( mockReviews );
				expect( props.totalReviews ).toEqual( mockReviews.length );
			} );
		} );
	} );

	describe( 'when the API returns an error', () => {
		beforeEach( () => {
			mockUtils.getReviews.mockImplementation(
				() => Promise.reject( { message: 'There was an error.' } )
			);
			renderer = render();
		} );

		it( 'sets the error prop', () => {
			const props = renderer.root.findByType( 'div' ).props;

			expect( props.error ).toEqual( { apiMessage: 'There was an error.' } );
			expect( typeof props.getReviews ).toBe( 'function' );
			expect( props.isLoading ).toBe( false );
			expect( props.reviews ).toEqual( [] );
		} );
	} );
} );
