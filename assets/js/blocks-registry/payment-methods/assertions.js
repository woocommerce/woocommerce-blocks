export const assertValidPaymentMethodComponent = ( paymentMethod ) => {
	// @todo detect if functional component (not render prop)
	if ( typeof paymentMethod !== 'function' ) {
		throw new Error(
			'The registered payment method must be a functional component'
		);
	}
};

export const assertValidPaymentMethod = ( paymentMethod ) => {
	// paymentMethods are expected to have 4 properties, tab, content, name, ariaLabel.
	if ( ! paymentMethod.tab ) {
		throw new Error(
			'A payment method is expected to have a tab property'
		);
	}
	if ( ! paymentMethod.content ) {
		throw new Error(
			'A payment method is expected to have a content property'
		);
	}
	if ( ! paymentMethod.ariaLabel ) {
		throw new Error(
			'A payment method is expected to have an ariaLabel property. This is used for tabs aria-label property.'
		);
	}
	try {
		assertValidPaymentMethodComponent( paymentMethod.content );
	} catch ( e ) {
		throw new Error(
			'The paymentMethod.content value must be a functional components'
		);
	}
	try {
		assertValidPaymentMethodComponent( paymentMethod.tab );
	} catch ( e ) {
		throw new Error(
			'The paymentMethod.tab value must be a functional components'
		);
	}
};
