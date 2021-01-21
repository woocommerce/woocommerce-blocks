/**
 * External dependencies
 */
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import {
	assertConfigHasProperties,
	assertValidElement,
	assertValidElementOrString,
} from './assertions';

export default class PaymentMethodConfig {
	constructor( config ) {
		// validate config
		PaymentMethodConfig.assertValidConfig( config );
		this.name = config.name;
		this.label = config.label;
		this.placeOrderButtonLabel = config.placeOrderButtonLabel;
		this.ariaLabel = config.ariaLabel;
		this.content = config.content;
		this.icons = config.icons;
		this.edit = config.edit;
		this.canMakePayment = config.canMakePayment;
		this.paymentMethodId = config.paymentMethodId || this.name;
		this.supports = {
			showSavedCards:
				config?.supports?.showSavedCards ||
				config?.supports?.savePaymentInfo || // Kept for backward compatibility if methods still pas this when registering.
				false,
			showSaveOption: config?.supports?.showSaveOption || false,
		};
	}

	static assertValidConfig = ( config ) => {
		assertConfigHasProperties( config, [
			'name',
			'label',
			'ariaLabel',
			'content',
			'edit',
			'canMakePayment',
		] );
		if ( typeof config.name !== 'string' ) {
			throw new Error(
				'The name property for the payment method must be a string'
			);
		}
		if (
			typeof config.icons !== 'undefined' &&
			! Array.isArray( config.icons ) &&
			config.icons !== null
		) {
			throw new Error(
				'The icons property for the payment method must be an array or null.'
			);
		}
		if (
			typeof config.paymentMethodId !== 'string' &&
			typeof config.paymentMethodId !== 'undefined'
		) {
			throw new Error(
				'The paymentMethodId property for the payment method must be a string or undefined (in which case it will be the value of the name property).'
			);
		}
		if (
			typeof config.placeOrderButtonLabel !== 'string' &&
			typeof config.placeOrderButtonLabel !== 'undefined'
		) {
			throw new TypeError(
				'The placeOrderButtonLabel property for the payment method must be a string'
			);
		}
		assertValidElementOrString( config.label, 'label' );
		assertValidElement( config.content, 'content' );
		assertValidElement( config.edit, 'edit' );
		if ( typeof config.ariaLabel !== 'string' ) {
			throw new TypeError(
				'The ariaLabel property for the payment method must be a string'
			);
		}
		if ( typeof config.canMakePayment !== 'function' ) {
			throw new TypeError(
				'The canMakePayment property for the payment method must be a function.'
			);
		}
		if (
			typeof config.supports?.showSavedCards !== 'undefined' &&
			typeof config.supports?.showSavedCards !== 'boolean'
		) {
			throw new TypeError(
				'If the payment method includes the `supports.showSavedCards` property, it must be a boolean'
			);
		}
		if ( typeof config.supports?.savePaymentInfo !== 'undefined' ) {
			deprecated(
				'Passing savePaymentInfo when registering a payment method is deprecated, instead you should pass showSavedCards and showSaveOption'
			);
		}
		if (
			typeof config.supports?.showSaveOption !== 'undefined' &&
			typeof config.supports?.showSaveOption !== 'boolean'
		) {
			throw new TypeError(
				'If the payment method includes the `supports.showSaveOption` property, it must be a boolean'
			);
		}
	};
}
