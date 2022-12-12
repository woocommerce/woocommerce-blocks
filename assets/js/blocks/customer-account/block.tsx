/**
 * External dependencies
 */
import { Icon } from '@wordpress/icons';
import {
	customerAccountStyle,
	customerAccountStyleAlt,
} from '@woocommerce/icons';
import { allSettings } from '@woocommerce/settings';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Attributes, DisplayStyle, IconStyle } from './types';

const AccountIcon = ( {
	iconStyle,
	displayStyle,
}: {
	iconStyle: IconStyle;
	displayStyle: DisplayStyle;
} ) => {
	const icon =
		iconStyle === IconStyle.ALT ? (
			<Icon icon={ customerAccountStyleAlt } size={ 18 } />
		) : (
			<Icon icon={ customerAccountStyle } size={ 18 } />
		);

	return displayStyle === DisplayStyle.TEXT_ONLY ? null : icon;
};

const Label = ( { displayStyle }: { displayStyle: DisplayStyle } ) => {
	const { currentUserId } = allSettings;

	if ( displayStyle === DisplayStyle.ICON_ONLY ) {
		return null;
	}

	return (
		<span>
			{ currentUserId
				? __( 'My Account', 'woo-gutenberg-products-block' )
				: __( 'Log in', 'woo-gutenberg-products-block' ) }
		</span>
	);
};

export const CustomerAccountBlock = ( {
	attributes,
}: {
	attributes: Attributes;
} ): JSX.Element => {
	const { displayStyle, iconStyle } = attributes;

	return (
		<a href="/my-account">
			<AccountIcon
				iconStyle={ iconStyle }
				displayStyle={ displayStyle }
			/>
			<Label displayStyle={ displayStyle } />
		</a>
	);
};

export default CustomerAccountBlock;
