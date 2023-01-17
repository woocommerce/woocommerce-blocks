/**
 * External dependencies
 */
import * as wpDataFunctions from '@wordpress/data';
import { EventObserversType } from '@woocommerce/base-context';

/**
 * Internal dependencies
 */
import { PAYMENT_STORE_KEY } from '../index';
import { __internalEmitPaymentProcessingEvent } from '../thunks';

/**
 * If an observer returns billingAddress, shippingAddress, or paymentData, then the values of these
 * should be updated in the data stores.
 */
const testShippingAddress = {
	first_name: 'test',
	last_name: 'test',
	company: 'test',
	address_1: 'test',
	address_2: 'test',
	city: 'test',
	state: 'test',
	postcode: 'test',
	country: 'test',
	phone: 'test',
};
const testBillingAddress = {
	...testShippingAddress,
	email: 'test@test.com',
};
const testPaymentMethodData = {
	payment_method: 'test',
};

describe( 'wc/store/payment thunks', () => {
	const testPaymentProcessingCallback = jest.fn();
	const testPaymentProcessingCallback2 = jest.fn();
	const currentObservers: EventObserversType = {
		payment_processing: new Map(),
	};
	currentObservers.payment_processing.set( 'test', {
		callback: testPaymentProcessingCallback,
		priority: 10,
	} );
	currentObservers.payment_processing.set( 'test2', {
		callback: testPaymentProcessingCallback2,
		priority: 10,
	} );

	describe( '__internalEmitPaymentProcessingEvent', () => {
		beforeEach( () => {
			jest.resetAllMocks();
		} );
		it( 'calls all registered observers', async () => {
			const {
				__internalEmitPaymentProcessingEvent:
					__internalEmitPaymentProcessingEventFromStore,
			} = wpDataFunctions.dispatch( PAYMENT_STORE_KEY );
			await __internalEmitPaymentProcessingEventFromStore(
				currentObservers,
				jest.fn()
			);
			expect( testPaymentProcessingCallback ).toHaveBeenCalled();
			expect( testPaymentProcessingCallback2 ).toHaveBeenCalled();
		} );

		it( 'sets metadata if successful observers return it', async () => {
			const testSuccessCallbackWithMetadata = jest.fn().mockReturnValue( {
				type: 'success',
				meta: {
					billingAddress: testBillingAddress,
					shippingAddress: testShippingAddress,
					paymentMethodData: testPaymentMethodData,
				},
			} );

			currentObservers.payment_processing.set( 'test3', {
				callback: testSuccessCallbackWithMetadata,
				priority: 10,
			} );

			const setBillingAddressMock = jest.fn();
			const setShippingAddressMock = jest.fn();
			const setPaymentMethodDataMock = jest.fn();
			const registryMock = {
				dispatch: jest.fn().mockImplementation( ( store: string ) => {
					return {
						...wpDataFunctions.dispatch( store ),
						setBillingAddress: setBillingAddressMock,
						setShippingAddress: setShippingAddressMock,
						__internalSetPaymentMethodData:
							setPaymentMethodDataMock,
					};
				} ),
			};

			// Await here because the function returned by the __internalEmitPaymentProcessingEvent action creator
			// (a thunk) returns a Promise.
			await __internalEmitPaymentProcessingEvent(
				currentObservers,
				jest.fn()
			)( {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore - it would be too much work to mock the entire registry, so we only mock dispatch on it,
				// which is all we need to test this thunk.
				registry: registryMock,
				dispatch: wpDataFunctions.dispatch( PAYMENT_STORE_KEY ),
			} );

			expect( setBillingAddressMock ).toHaveBeenCalledWith(
				testBillingAddress
			);
			// expect( setShippingAddressMock ).toHaveBeenCalledWith(
			// 	testShippingAddress
			// );
			expect( setPaymentMethodDataMock ).toHaveBeenCalledWith(
				testPaymentMethodData
			);
		} );
	} );
} );
