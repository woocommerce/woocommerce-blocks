/**
 * External dependencies
 */
import TestRenderer, { act } from 'react-test-renderer';
import { createRegistry, RegistryProvider } from '@wordpress/data';
import { CART_STORE_KEY as storeKey } from '@woocommerce/block-data';

/**
 * Internal dependencies
 */
import { useShippingRates } from '../shipping';

jest.mock( '@woocommerce/block-data', () => ( {
	__esModule: true,
	CART_STORE_KEY: 'test/store',
} ) );

describe( 'useShippingRates', () => {
	let registry, mocks, renderer;
	const getProps = ( testRenderer ) => {
		const {
			shippingRates,
			shippingAddress,
			setShippingAddress,
			shippingRatesLoading,
		} = testRenderer.root.findByType( 'div' ).props;
		return {
			shippingRates,
			shippingAddress,
			setShippingAddress,
			shippingRatesLoading,
		};
	};

	const getWrappedComponents = ( Component ) => (
		<RegistryProvider value={ registry }>
			<Component />
		</RegistryProvider>
	);

	const getTestComponent = () => () => {
		const items = useShippingRates();
		return <div { ...items } />;
	};

	const mockCartData = {
		coupons: [],
		items: [ { foo: 'bar' } ],
		itemsCount: 123,
		itemsWeight: 123,
		needsShipping: false,
		shippingAddress: {
			country: '',
			state: '',
			city: '',
			postcode: '',
		},
		billingAddress: {
			country: '',
			state: '',
			city: '',
			postcode: '',
		},
		shippingRates: [
			{
				shippingRates: [ { foo: 'bar' } ],
				destination: {
					country: '',
					state: '',
					city: '',
					postcode: '',
				},
			},
		],
	};

	const setUpMocks = () => {
		mocks = {
			selectors: {
				getCartData: jest.fn().mockReturnValue( mockCartData ),
				getCartErrors: jest.fn().mockReturnValue( false ),
				getCartTotals: jest.fn().mockReturnValue( 123 ),
				areShippingRatesLoading: jest.fn().mockReturnValue( false ),
				hasFinishedResolution: jest.fn().mockReturnValue( true ),
			},
		};
		registry.registerStore( storeKey, {
			reducer: () => ( {} ),
			selectors: mocks.selectors,
		} );
	};

	beforeEach( () => {
		registry = createRegistry();
		mocks = {};
		renderer = null;
		setUpMocks();
	} );
	it( 'should return expected address provided by the store', () => {
		const TestComponent = getTestComponent();
		act( () => {
			renderer = TestRenderer.create(
				getWrappedComponents( TestComponent )
			);
		} );

		const { shippingAddress } = getProps( renderer );
		expect( shippingAddress ).toStrictEqual( mockCartData.shippingAddress );
		// rerender
		act( () => {
			renderer.update( getWrappedComponents( TestComponent ) );
		} );
		// re-render should result in same shippingAddress object.
		const { shippingAddress: newShippingAddress } = getProps( renderer );
		expect( newShippingAddress ).toStrictEqual( shippingAddress );
		renderer.unmount();
	} );

	it( 'should return expected shipping rates provided by the store', () => {
		const TestComponent = getTestComponent();
		act( () => {
			renderer = TestRenderer.create(
				getWrappedComponents( TestComponent )
			);
		} );

		const { shippingRates } = getProps( renderer );
		expect( shippingRates ).toStrictEqual( mockCartData.shippingRates );
		// rerender
		act( () => {
			renderer.update( getWrappedComponents( TestComponent ) );
		} );
		// re-render should result in same shippingAddress object.
		const { shippingRates: newShippingRates } = getProps( renderer );
		expect( newShippingRates ).toStrictEqual( shippingRates );
		renderer.unmount();
	} );
} );
