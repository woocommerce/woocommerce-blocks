type Variant = 'text' | 'contained' | 'outlined';

export const getVariant = (
	className: string,
	defaultVariant: Variant
): Variant => {
	if ( className.includes( 'is-style-outline' ) ) {
		return 'outlined';
	}

	if ( className.includes( 'is-style-fill' ) ) {
		return 'contained';
	}

	return defaultVariant;
};
