/**
 * Internal dependencies
 */
import { assertConfigHasProperties, assertValidElement } from './assertions';

export default class ExpressPaymentMethodConfig {
	constructor( config ) {
		// validate config
		ExpressPaymentMethodConfig.assertValidConfig( config );
		this.name = config.name;
		this.content = config.content;
		this.edit = config.edit;
		this.canMakePayment = config.canMakePayment;
	}

	static assertValidConfig = ( config ) => {
		assertConfigHasProperties( config, [ 'name', 'content', 'edit' ] );
		if ( typeof config.name !== 'string' ) {
			throw new TypeError(
				'The name property for the express payment method must be a string'
			);
		}
		assertValidElement( config.content, 'content' );
		assertValidElement( config.edit, 'edit' );
		if ( typeof config.canMakePayment !== 'function' ) {
			throw new TypeError(
				'The canMakePayment property for the express payment method must be a function.'
			);
		}
	};
}
