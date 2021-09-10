/**
 * External dependencies
 */
import type {
	CanMakePaymentArgument,
	CanMakePayment,
	CanMakePaymentReturnType,
} from '@woocommerce/type-defs/payments';

/**
 * Internal dependencies
 */
import type {
	CanMakePaymentExtensionsCallbacks,
	ExtensionNamespace,
} from './extensions-config';

// Filter out payment methods by supported features and cart requirement.
export const canMakePaymentWithFeaturesCheck = (
	canMakePayment: CanMakePayment,
	features: string[]
) => ( canPayArgument: CanMakePaymentArgument ): CanMakePaymentReturnType => {
	const requirements = canPayArgument.paymentRequirements || [];
	const featuresSupportRequirements = requirements.every( ( requirement ) =>
		features.includes( requirement )
	);
	return featuresSupportRequirements && canMakePayment( canPayArgument );
};

// Filter out payment methods by callbacks registered by extensions.
export const canMakePaymentWithExtensions = (
	canMakePayment: CanMakePayment,
	extensionsCallbacks: CanMakePaymentExtensionsCallbacks,
	paymentMethodName: ExtensionNamespace
) => ( canPayArgument: CanMakePaymentArgument ): CanMakePaymentReturnType => {
	// Validate whether the payment method is available based on its own criteria first.
	let canPay = canMakePayment( canPayArgument );

	if ( canPay ) {
		// Gather all callbacks for paymentMethodName
		const namespacedCallbacks: Record<
			ExtensionNamespace,
			CanMakePayment
		> = {};

		Object.entries( extensionsCallbacks ).forEach(
			( [ namespace, callbacks ] ) => {
				namespacedCallbacks[ namespace ] =
					callbacks[ paymentMethodName ];
			}
		);

		canPay = Object.keys( namespacedCallbacks ).every( ( namespace ) => {
			try {
				return namespacedCallbacks[ namespace ]( canPayArgument );
			} catch ( err ) {
				// eslint-disable-next-line no-console
				console.error(
					`Error when executing callback for ${ paymentMethodName } in ${ namespace }`,
					err
				);
				// .every() expects a return value at the end of every arrow function and
				// this ensures that the error is ignored when computing the whole result.
				return true;
			}
		} );
	}

	return canPay;
};
