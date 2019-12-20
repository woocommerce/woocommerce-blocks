export const assertValidPaymentMethodComponent = (
	component,
	componentName
) => {
	// @todo detect if functional component (not render prop)
	if ( typeof component !== 'function' ) {
		throw new TypeError(
			`The ${ componentName } for the payment method must be a functional component`
		);
	}
};

export const assertConfigHasProperties = (
	config,
	expectedProperties = []
) => {
	const missingProperties = expectedProperties.reduce( ( acc, property ) => {
		if ( ! config[ property ] ) {
			acc.push( property );
		}
		return acc;
	}, [] );
	if ( missingProperties.length > 0 ) {
		const message =
			'The payment method configuration object is missing the following properties:';
		throw new TypeError( message + missingProperties.join( ', ' ) );
	}
};

export const assertValidPaymentMethodCreator = ( creator, configName ) => {
	if ( typeof creator !== 'function' ) {
		throw new TypeError(
			`A payment method must be registered with a function that creates and returns a ${ configName } instance`
		);
	}
};
