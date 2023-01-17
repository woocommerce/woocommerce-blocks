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

		it( 'sets metadata if an observer returns it', async () => {
			/**
			 * If an observer returns billingAddress, shippingAddress, or paymentData, then the values of these
			 * should be updated in the data stores.
			 */
			const testBillingAddress = {
				first_name: 'test',
				last_name: 'test',
				company: 'test',
				address_1: 'test',
				address_2: 'test',
				city: 'test',
				state: 'test',
				postcode: 'test',
				country: 'test',
				email: 'test',
				phone: 'test',
			};
			const testCallbackWithMetadata = jest.fn().mockReturnValue( {
				type: 'success',
				meta: {
					billingAddress: testBillingAddress,
				},
			} );

			currentObservers.payment_processing.set( 'test3', {
				callback: testCallbackWithMetadata,
				priority: 10,
			} );

			const setBillingAddressMock = jest.fn();
			const registryMock = {
				dispatch: jest.fn().mockImplementation( ( store: string ) => {
					return {
						...wpDataFunctions.dispatch( store ),
						setBillingAddress: setBillingAddressMock,
					};
				} ),
			};

			// Await here because the function returned by the __internalEmitPaymentProcessingEvent action creator
			// (a thunk) returns a Promise.
			await __internalEmitPaymentProcessingEvent(
				currentObservers,
				jest.fn()
			)( {
				registry: registryMock,
				dispatch: wpDataFunctions.dispatch( PAYMENT_STORE_KEY ),
			} );

			expect( setBillingAddressMock ).toHaveBeenCalled();
		} );
	} );
} );
