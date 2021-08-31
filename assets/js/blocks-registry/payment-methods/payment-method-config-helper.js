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

export const canMakePaymentWithExtensions = (
	canMakePayment,
	additionalCallbacks
) => ( canPayArgument ) => {
	// validate whether payment method is available
	let canPay = canMakePayment( canPayArgument );
	if ( canPay ) {
		canPay = additionalCallbacks.every( ( canMakePaymentCallback ) =>
			canMakePaymentCallback( canPayArgument )
		);
	}
	return canPay;
};
