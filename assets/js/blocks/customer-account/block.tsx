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
import './style.scss';

const AccountIcon = ( {
	iconStyle,
	displayStyle,
}: {
	iconStyle: IconStyle;
	displayStyle: DisplayStyle;
} ) => {
	const icon =
		iconStyle === IconStyle.ALT
			? customerAccountStyleAlt
			: customerAccountStyle;

	return displayStyle === DisplayStyle.TEXT_ONLY ? null : (
		<Icon className="icon" icon={ icon } size={ 16 } />
	);
};

const Label = ( { displayStyle }: { displayStyle: DisplayStyle } ) => {
	const { currentUserId } = allSettings;

	if ( displayStyle === DisplayStyle.ICON_ONLY ) {
		return null;
	}

	return (
		<span className="label">
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
