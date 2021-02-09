/**
 * External dependencies
 */
import TestRenderer from 'react-test-renderer';
import { __experimentalRegisterCheckoutFilters } from '@woocommerce/blocks-checkout';

/**
 * Internal dependencies
 */
import OrderSummaryItem from '../order-summary-item';

describe( 'OrderSummaryItem', () => {
	test( "should not render a suffix if the filter to change it isn't registered", () => {
		const component = TestRenderer.create(
			<OrderSummaryItem
				cartItem={ {
					quantity: 1,
					images: [],
					name: 'Test item',
					permalink: '/test-item',
					prices: {
						price: '5000',
						regular_price: '61400',
						raw_prices: {
							precision: 6,
							price: '50000000',
							regular_price: '614000000',
							sale_price: '50000000',
						},
					},
					summary: 'Great item',
				} }
			/>
		);

		expect( component.toJSON() ).toMatchSnapshot();
	} );
	test( 'should render a suffix if one is added by a filter', () => {
		__experimentalRegisterCheckoutFilters( 'woocommerce-subscriptions', {
			subtotalSuffix: () => {
				return 'test suffix';
			},
		} );

		const component = TestRenderer.create(
			<OrderSummaryItem
				cartItem={ {
					quantity: 1,
					images: [],
					name: 'Test item',
					permalink: '/test-item',
					prices: {
						price: '5000',
						regular_price: '61400',
						raw_prices: {
							precision: 6,
							price: '50000000',
							regular_price: '614000000',
							sale_price: '50000000',
						},
					},
					summary: 'Great item',
				} }
			/>
		);

		expect( component.toJSON() ).toMatchSnapshot();
	} );
} );
