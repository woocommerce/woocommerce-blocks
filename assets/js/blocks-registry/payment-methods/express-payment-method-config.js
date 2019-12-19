/**
 * Internal dependencies
 */
import {
	assertConfigHasProperties,
	assertValidPaymentMethodComponent,
} from './assertions';

export default class ExpressPaymentMethodConfig {
	constructor( config ) {
		// validate config
		ExpressPaymentMethodConfig.assertValidConfig( config );
		this.id = config.id;
		this.activeContent = config.activeContent;
		this.canMakePayment = config.canMakePayment;
		Object.freeze( this );
	}

	static assertValidConfig = ( config ) => {
		assertConfigHasProperties( config, [ 'id', 'activeContent' ] );
		if ( typeof config.id !== 'string' ) {
			throw new Error(
				'The id for the express payment method must be a string'
			);
		}
		assertValidPaymentMethodComponent(
			config.activeContent,
			'activeContent'
		);
		if ( ! ( config.canMakePayment instanceof Promise ) ) {
			throw new Error(
				'The canMakePayment property for the express payment method must be a promise.'
			);
		}
	};
}
