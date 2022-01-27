/**
 * External dependencies
 */
import {
	render,
	findByText,
	findByRole,
	screen,
	findByLabelText,
	queryByLabelText,
	queryByText,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

/**
 * Internal dependencies
 */
import {
	onSaleItems as mockOnSaleItems,
	addonsItems as mockAddonsItems,
} from '../../../../../../../../tests/js/fixtures/cart/items';
import { previewCart as mockPreviewCart } from '../../../../../../previews/cart';
import Block from '../block';
const baseContextHooks = jest.requireMock( '@woocommerce/base-context/hooks' );
const baseContext = jest.requireMock( '@woocommerce/base-context' );
const woocommerceSettings = jest.requireMock( '@woocommerce/settings' );

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

/**
 * This will check if the text is present an the container, it can be within
 * multiple elements, for example:
 * <div>
 *     <span>Text</span>
 *     <span>is</span>
 *     <span>present</span>
 * </div>
 *
 * @param {string} text The text to find
 * @return {function(*, ?)} the matcher function for RTL to use.
 */
const textContentMatcherAcrossSiblings = ( text ) => {
	return function ( _content, node ) {
		/*
		If the element in question is not the first child, then skip, as we
		will have already run this check for its siblings (when we ran it on the
		first child).
		*/
		const siblings =
			node?.parentElement?.children[ 0 ] === node
				? node?.parentElement?.children
				: [];
		let siblingText = '';

		// Get the text of all siblings and put it into a single string.
		if ( siblings?.length > 0 ) {
			siblingText = Array.from( siblings )
				.map( ( child ) => child.textContent )
				.filter( Boolean )
				.join( ' ' )
				.trim();
		}
		return siblingText !== '' && siblingText === text;
	};
};

const defaultUseStoreCartValue = {
	cartItems: mockPreviewCart.items,
	cartTotals: mockPreviewCart.totals,
	cartCoupons: mockPreviewCart.coupons,
	cartFees: mockPreviewCart.fees,
	needsShipping: mockPreviewCart.needs_shipping,
	shippingRates: mockPreviewCart.shipping_rates,
	shippingAddress: mockPreviewCart.shipping_address,
	billingAddress: mockPreviewCart.billing_address,
	cartHasCalculatedShipping: mockPreviewCart.has_calculated_shipping,
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
		needsShipping: mockPreviewCart.needs_shipping,
		shippingRates: mockPreviewCart.shipping_rates,
		shippingAddress: mockPreviewCart.shipping_address,
		billingAddress: mockPreviewCart.billing_address,
		cartHasCalculatedShipping: mockPreviewCart.has_calculated_shipping,
	} ),
} ) );

jest.mock( '@woocommerce/base-context', () => ( {
	...jest.requireActual( '@woocommerce/base-context' ),
	useContainerWidthContext: jest.fn().mockReturnValue( {
		hasContainerWidth: true,
		isLarge: true,
	} ),
	useShippingDataContext: jest.fn().mockReturnValue( {
		needsShipping: true,
		shippingRates: [
			{
				package_id: 0,
				name: 'Shipping method',
				destination: {
					address_1: '',
					address_2: '',
					city: '',
					state: '',
					postcode: '',
					country: '',
				},
				items: [
					{
						key: 'fb0c0a746719a7596f296344b80cb2b6',
						name: 'Hoodie - Blue, Yes',
						quantity: 1,
					},
					{
						key: '1f0e3dad99908345f7439f8ffabdffc4',
						name: 'Beanie',
						quantity: 1,
					},
				],
				shipping_rates: [
					{
						rate_id: 'flat_rate:1',
						name: 'Flat rate',
						description: '',
						delivery_time: '',
						price: '500',
						taxes: '0',
						instance_id: 1,
						method_id: 'flat_rate',
						meta_data: [
							{
								key: 'Items',
								value:
									'Hoodie - Blue, Yes &times; 1, Beanie &times; 1',
							},
						],
						selected: false,
						currency_code: 'USD',
						currency_symbol: '$',
						currency_minor_unit: 2,
						currency_decimal_separator: '.',
						currency_thousand_separator: ',',
						currency_prefix: '$',
						currency_suffix: '',
					},
					{
						rate_id: 'local_pickup:2',
						name: 'Local pickup',
						description: '',
						delivery_time: '',
						price: '0',
						taxes: '0',
						instance_id: 2,
						method_id: 'local_pickup',
						meta_data: [
							{
								key: 'Items',
								value:
									'Hoodie - Blue, Yes &times; 1, Beanie &times; 1',
							},
						],
						selected: false,
						currency_code: 'USD',
						currency_symbol: '$',
						currency_minor_unit: 2,
						currency_decimal_separator: '.',
						currency_thousand_separator: ',',
						currency_prefix: '$',
						currency_suffix: '',
					},
					{
						rate_id: 'free_shipping:5',
						name: 'Free shipping',
						description: '',
						delivery_time: '',
						price: '0',
						taxes: '0',
						instance_id: 5,
						method_id: 'free_shipping',
						meta_data: [
							{
								key: 'Items',
								value:
									'Hoodie - Blue, Yes &times; 1, Beanie &times; 1',
							},
						],
						selected: true,
						currency_code: 'USD',
						currency_symbol: '$',
						currency_minor_unit: 2,
						currency_decimal_separator: '.',
						currency_thousand_separator: ',',
						currency_prefix: '$',
						currency_suffix: '',
					},
				],
			},
		],
	} ),
} ) );

jest.mock( '@woocommerce/settings', () => {
	const originalModule = jest.requireActual( '@woocommerce/settings' );

	return {
		...originalModule,
		getSetting: jest.fn().mockImplementation( ( setting, ...rest ) => {
			if ( setting === 'couponsEnabled' ) {
				return true;
			}
			return originalModule.getSetting( setting, ...rest );
		} ),
	};
} );

const setUseStoreCartValue = ( value = defaultUseStoreCartValue ) => {
	baseContextHooks.useStoreCart.mockReturnValue( value );
};

const setGetSettingImplementation = ( func ) => {
	woocommerceSettings.getSetting.mockImplementation( func );
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

	it( 'Renders items with item data in the sidebar', async () => {
		setUseStoreCartValue( {
			...defaultUseStoreCartValue,
			cartItems: [ ...mockAddonsItems ],
		} );
		const { container } = render( <Block showRateAfterTaxName={ true } /> );
		expect(
			await findByText( container, 'WooCommerce style ($5.00):' )
		).toBeInTheDocument();
		expect(
			await findByText( container, 'WooCommerce logo ($10.00):' )
		).toBeInTheDocument();
	} );

	it( 'Renders the items subtotal correctly', async () => {
		const { container } = render( <Block showRateAfterTaxName={ true } /> );

		expect(
			await findByText(
				container,
				textContentMatcherAcrossSiblings( 'Subtotal $40.00' )
			)
		).toBeInTheDocument();
	} );

	// The cart_totals value of useStoreCart is what drives this
	it( 'If discounted items are in the cart the discount subtotal is shown correctly', async () => {
		setUseStoreCartValue( {
			...defaultUseStoreCartValue,
			cartItems: [ ...mockPreviewCart.items, ...mockOnSaleItems ],
			cartTotals: {
				...mockPreviewCart.totals,
				total_discount: 1000,
				total_price: 3800,
			},
		} );
		const { container } = render( <Block showRateAfterTaxName={ true } /> );
		expect(
			await findByText(
				container,
				textContentMatcherAcrossSiblings( 'Discount -$10.00' )
			)
		).toBeInTheDocument();
	} );

	it( 'Shows fees if the cart_fees are set', async () => {
		setUseStoreCartValue( {
			...defaultUseStoreCartValue,
			cartFees: [
				{
					totals: {
						currency_code: 'USD',
						currency_decimal_separator: '.',
						currency_minor_unit: 2,
						currency_prefix: '$',
						currency_suffix: '',
						currency_symbol: '$',
						currency_thousand_separator: ',',
						total: 1000,
						total_tax: '0',
					},
				},
			],
		} );
		const { container } = render( <Block showRateAfterTaxName={ true } /> );
		expect(
			await findByText(
				container,
				textContentMatcherAcrossSiblings( 'Fee $10.00' )
			)
		).toBeInTheDocument();
	} );

	it( 'Shows the coupon entry form when coupons are enabled', async () => {
		setUseStoreCartValue();
		const { container } = render( <Block showRateAfterTaxName={ true } /> );
		expect(
			await findByText( container, 'Coupon code' )
		).toBeInTheDocument();
		const couponButton = await findByRole( container, 'button', {
			name: /apply a coupon code/i,
		} );
		await userEvent.click( couponButton );
		const couponCodeInput = await findByLabelText(
			container,
			'Enter code'
		);
		expect( couponCodeInput ).toBeInTheDocument();
		await userEvent.click( couponButton );
		const notPresentCouponCodeInput = queryByLabelText(
			container,
			'Enter code'
		);
		expect( notPresentCouponCodeInput ).not.toBeInTheDocument();
	} );

	it( 'Does not show the coupon entry if coupons are not enabled', () => {
		setUseStoreCartValue();
		setGetSettingImplementation( ( setting, ...rest ) => {
			if ( setting === 'couponsEnabled' ) {
				return false;
			}
			const originalModule = jest.requireActual(
				'@woocommerce/settings'
			);
			return originalModule.getSetting( setting, ...rest );
		} );
		const { container } = render( <Block showRateAfterTaxName={ true } /> );
		expect(
			queryByText( container, 'Coupon code' )
		).not.toBeInTheDocument();
	} );
} );
