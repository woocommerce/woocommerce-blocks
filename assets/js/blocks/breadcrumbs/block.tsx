/**
 * External dependencies
 */
import { getSetting } from '@woocommerce/settings';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Attributes, DisplayStyle } from './types';

const Label = ( { displayStyle }: { displayStyle: DisplayStyle } ) => {
	if ( displayStyle === DisplayStyle.ICON_ONLY ) {
		return null;
	}

	return (
		<span className="label">
			{ __( 'Home', 'woo-gutenberg-products-block' ) }
		</span>
	);
};

export const BreadcrumbsBlock = ( {
	attributes,
}: {
	attributes: Attributes;
} ): JSX.Element => {
	const { displayStyle } = attributes;

	return (
		<a href={ getSetting( 'homeUrl' ) }>
			<Label displayStyle={ displayStyle } />
		</a>
	);
};

export default BreadcrumbsBlock;
