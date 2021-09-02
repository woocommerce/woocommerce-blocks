// Filter out payment methods by supported features and cart requirement.
export const canMakePaymentWithFeaturesCheck = ( canMakePayment, features ) => (
	canPayArgument
) => {
	const requirements = canPayArgument.paymentRequirements || [];
	const featuresSupportRequirements = requirements.every( ( requirement ) =>
		features.includes( requirement )
	);
	return featuresSupportRequirements && canMakePayment( canPayArgument );
};

// Filter out payment methods by callbacks registered by extensions.
export const canMakePaymentWithExtensions = (
	canMakePayment,
	extensionsCallbacks
) => ( canPayArgument ) => {
	// Check whether the payment method is available.
	let canPay = canMakePayment( canPayArgument );

	if ( canPay ) {
		canPay = extensionsCallbacks.every( ( canMakePaymentCallback ) =>
			canMakePaymentCallback( canPayArgument )
		);
	}

	return canPay;
};
