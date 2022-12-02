/**
 * External dependencies
 */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import * as hooks from '@woocommerce/base-context/hooks';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import RatingFilterBlock from '../block';
import { Attributes } from '../types';

jest.mock( '@woocommerce/base-context/hooks', () => ( {
	__esModule: true,
	...jest.requireActual( '@woocommerce/base-context/hooks' ),
} ) );

const setWindowUrl = ( { url }: SetWindowUrlParams ) => {
	global.window = Object.create( window );
	Object.defineProperty( window, 'location', {
		value: {
			href: url,
		},
		writable: true,
	} );
};

const stubCollectionData = () => ( {
	price_range: null,
	attribute_counts: null,
	rating_counts: [
		{ rating: 2, count: 5 },
		{ rating: 4, count: 24 },
		{ rating: 5, count: 1 },
	],
	stock_status_counts: null,
} );

type DisplayStyle = 'list' | 'dropdown';
type SelectType = 'single' | 'multiple';
interface SetupParams {
	filterRating: string;
	displayStyle: DisplayStyle;
	selectType: SelectType;
}

const selectors = {
	list: '.wc-block-rating-filter.style-list',
	dropdown: '.wc-block-rating-filter.style-dropdown',
};

const setup = ( params: SetupParams ) => {
	const url = `http://woo.local/${
		params.filterRating ? '?rating_filter=' + params.filterRating : ''
	}`;
	setWindowUrl( { url } );

	const attributes: Attributes = {
		displayStyle: params.displayStyle || 'list',
		selectType: params.selectType || 'single',
		showCounts: true,
		showFilterButton: false,
		isPreview: false,
	};

	jest.spyOn( hooks, 'useCollectionData' ).mockReturnValue( {
		results: stubCollectionData(),
		isLoading: false,
	} );

	// jest.spyOn( window.history, 'replaceState' ).mockImplementation(
	// 	( state, u, newUrl ) => {
	// 		setWindowUrl( newUrl );
	// 	}
	// );

	const { container, ...utils } = render(
		<RatingFilterBlock attributes={ attributes } />
	);
	const rating2 = screen.queryByLabelText( 'Rated 2 out of 5' );
	const rating4 = screen.queryByLabelText( 'Rated 4 out of 5' );
	const rating5 = screen.queryByLabelText( 'Rated 5 out of 5' );
	const dropdown = container.querySelector( selectors.dropdown );
	const list = container.querySelector( selectors.list );
	return {
		...utils,
		container,
		rating2,
		rating4,
		rating5,
		dropdown,
		list,
	};
};

interface SetupParams {
	filterRating: string;
	displayStyle: DisplayStyle;
	selectType: SelectType;
}

// const setupSingleChoiceList = ( filterRating = '5' ) =>
// 	setup( {
// 		filterRating,
// 		displayStyle: 'list',
// 		selectType: 'single',
// 	} );
// const setupMultipleChoiceList = ( filterRating = '5' ) =>
// 	setup( {
// 		filterRating,
// 		displayStyle: 'list',
// 		selectType: 'multiple',
// 	} );

const setupSingleChoiceDropdown = ( filterRating = '5' ) =>
	setup( {
		filterRating,
		displayStyle: 'dropdown',
		selectType: 'single',
	} );

// const setupMultipleChoiceDropdown = ( filterRating = '5' ) =>
// 	setup( {
// 		filterRating,
// 		displayStyle: 'dropdown',
// 		selectType: 'single',
// 	} );

afterEach( cleanup );

describe( 'RatingFilterBlock', () => {
	describe( 'Single choice Dropdown', () => {
		test( 'renders dropdown', () => {
			const { dropdown, list } = setupSingleChoiceDropdown();
			expect( dropdown ).toBeDefined();
			expect( list ).toBeNull();
		} );

		test( 'renders chips based on URL params', () => {
			const ratingParam = '2';
			const { rating2, rating4, rating5 } =
				setupSingleChoiceDropdown( ratingParam );

			expect( rating2 ).toBeInTheDocument();
			expect( rating4 ).toBeNull();
			expect( rating5 ).toBeNull();
		} );

		test( 'replaces chosen option when other one is clicked', () => {
			const ratingParam = '2';
			const { dropdown, rating2, rating4 } =
				setupSingleChoiceDropdown( ratingParam );

			expect( rating2 ).toBeDefined();
			expect( rating4 ).toBeNull();

			if ( dropdown ) {
				userEvent.click( dropdown );
			}

			if ( rating4 ) {
				userEvent.click( rating4 );
			}

			expect( rating2 ).toBeDefined();
			expect( rating4 ).toBeNull();
		} );
	} );
} );
