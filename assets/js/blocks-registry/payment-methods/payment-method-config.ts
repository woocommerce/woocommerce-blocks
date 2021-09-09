/**
 * External dependencies
 */
import deprecated from '@wordpress/deprecated';
import type { ReactNode } from 'react';
import type {
	PaymentMethodConfig as PaymentMethodConfigType,
	ObjectType,
	Supports,
	CanMakePayment,
	CanMakePaymentArgument,
} from '@woocommerce/type-defs/payments';

/**
 * Internal dependencies
 */
import {
	canMakePaymentWithFeaturesCheck,
	canMakePaymentWithExtensions,
} from './payment-method-config-helper';
import { extensionsConfig, PaymentMethodName } from './extensions-config';

// we assign a value in the class for supports.features
interface SupportsConfig extends Supports {
	features: string[];
}
export interface PaymentMethodConfigClass {
	name: string;
	content: ReactNode;
	edit: ReactNode;
	paymentMethodId?: string;
	supports: SupportsConfig;
	icons?: ObjectType;
	label: ReactNode;
	ariaLabel: string;
	placeOrderButtonLabel?: string;
	savedTokenComponent?: ReactNode;
	canMakePaymentFromConfig: CanMakePayment;
}

const NullComponent = () => {
	return null;
};

export default class PaymentMethodConfig implements PaymentMethodConfigClass {
	public name: string;
	public content: ReactNode;
	public edit: ReactNode;
	public paymentMethodId?: string;
	public supports: SupportsConfig;
	public icons?: ObjectType;
	public label: ReactNode;
	public ariaLabel: string;
	public placeOrderButtonLabel?: string;
	public savedTokenComponent?: ReactNode;
	public canMakePaymentFromConfig: CanMakePayment;

	constructor( config: PaymentMethodConfigType ) {
		// validate config
		PaymentMethodConfig.assertValidConfig( config );
		this.name = config.name;
		this.label = config.label;
		this.placeOrderButtonLabel = config.placeOrderButtonLabel;
		this.ariaLabel = config.ariaLabel;
		this.content = config.content;
		this.savedTokenComponent = config.savedTokenComponent || NullComponent;
		this.icons = config.icons;
		this.edit = config.edit;
		this.paymentMethodId = config.paymentMethodId || this.name;
		this.supports = {
			showSavedCards:
				config?.supports?.showSavedCards ||
				config?.supports?.savePaymentInfo || // Kept for backward compatibility if methods still pass this when registering.
				false,
			showSaveOption: config?.supports?.showSaveOption || false,
			features: config?.supports?.features || [ 'products' ],
		};
		this.canMakePaymentFromConfig = config.canMakePayment;
	}

	// canMakePayment is calculated each time based on data that modifies outside of the class (eg: cart data).
	get canMakePayment(): (
		canPayArgument: CanMakePaymentArgument
	) => boolean {
		const canPay = canMakePaymentWithFeaturesCheck(
			this.canMakePaymentFromConfig,
			this.supports.features
		);

		// Loop through all callbacks to check if there are any registered for this payment method.
		return ( Object.values( extensionsConfig.canMakePayment ) as Record<
			PaymentMethodName,
			CanMakePayment
		>[] ).some( ( callbacks ) => this.name in callbacks )
			? canMakePaymentWithExtensions(
					canPay,
					extensionsConfig.canMakePayment,
					this.name
			  )
			: canPay;
	}

	static assertValidConfig = ( config: PaymentMethodConfigType ): void => {
		if ( typeof config.supports?.savePaymentInfo !== 'undefined' ) {
			deprecated(
				'Passing savePaymentInfo when registering a payment method.',
				{
					alternative: 'Pass showSavedCards and showSaveOption',
					plugin: 'woocommerce-gutenberg-products-block',
					link:
						'https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/3686',
				}
			);
		}
	};
}
