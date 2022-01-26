/**
 * External dependencies
 */
import { render, findByText, screen } from '@testing-library/react';

/**
 * Internal dependencies
 */
import { previewCart as mockPreviewCart } from '../../../../../../previews/cart';
import Block from '../block';
const baseContextHooks = jest.requireMock( '@woocommerce/base-context/hooks' );

/**
 * This function will match text over several elements, the standard matcher
 * will only find strings if they are within the same element.
 *
 * @param {string} text The text to find.
 * @return {function(*, ?)} The matcher function for RTL to use.
 */
const textContentMatcher = ( text ) => {
	return function ( _content, node ) {
		const hasText = ( _node ) => _node.textContent === text;
		const nodeHasText = hasText( node );
		const childrenDontHaveText = Array.from( node?.children || [] ).every(
			( child ) => ! hasText( child )
		);
		return nodeHasText && childrenDontHaveText;
	};
};

jest.mock( '@woocommerce/settings', () => {
	const originalModule = jest.requireActual( '@woocommerce/settings' );

	return {
		...originalModule,
		getSetting: ( setting, ...rest ) => {
			if ( setting === 'couponsEnabled' ) {
				return true;
			}
			return originalModule.getSetting( setting, ...rest );
		},
	};
} );

const defaultUseStoreCartValue = {
	cartItems: mockPreviewCart.items,
	cartTotals: mockPreviewCart.totals,
	cartCoupons: mockPreviewCart.coupons,
	cartFees: mockPreviewCart.fees,
};

jest.mock( '@woocommerce/base-context/hooks', () => ( {
	...jest.requireActual( '@woocommerce/base-context/hooks' ),

	/*
	We need to redefine this here despite the defaultUseStoreCartValue above
	because jest doesn't like to set up mocks with out of scope variables
	*/
	useStoreCart: jest.fn().mockReturnValue( {
		cartItems: mockPreviewCart.items,
		cartTotals: mockPreviewCart.totals,
		cartCoupons: mockPreviewCart.coupons,
		cartFees: mockPreviewCart.fees,
	} ),
} ) );

jest.mock( '@woocommerce/base-context', () => ( {
	...jest.requireActual( '@woocommerce/base-context' ),
	useContainerWidthContext: jest.fn().mockReturnValue( {
		hasContainerWidth: true,
		isLarge: true,
	} ),
} ) );

const setUseStoreCartValue = ( value = defaultUseStoreCartValue ) => {
	baseContextHooks.useStoreCart.mockReturnValue( value );
};

describe( 'Checkout Order Summary', () => {
	beforeEach( () => setUseStoreCartValue() );

	it( 'Renders the standard preview items in the sidebar', async () => {
		const { container } = render( <Block showRateAfterTaxName={ true } /> );
		expect(
			await findByText( container, 'Warm hat for winter' )
		).toBeInTheDocument();
		expect(
			await findByText( container, 'Lightweight baseball cap' )
		).toBeInTheDocument();

		// Checking if variable product is rendered.
		expect(
			await screen.findByText( textContentMatcher( 'Color: Yellow' ) )
		).toBeInTheDocument();
		expect(
			await screen.findByText( textContentMatcher( 'Size: Small' ) )
		).toBeInTheDocument();
	} );
} );
