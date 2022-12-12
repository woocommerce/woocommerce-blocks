/**
 * External dependencies
 */
import { Icon } from '@wordpress/icons';
import {
	customerAccountStyle,
	customerAccountStyleAlt,
} from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import { Attributes, DisplayStyle, IconStyle } from './types';

export const CustomerAccountBlock = ( {
	attributes,
}: {
	attributes: Attributes;
} ): JSX.Element => {
	const { displayStyle, iconStyle } = attributes;

	const icon =
		iconStyle === IconStyle.ALT ? (
			<Icon icon={ customerAccountStyleAlt } size={ 16 } />
		) : (
			<Icon icon={ customerAccountStyle } size={ 16 } />
		);

	return (
		<div>
			{ displayStyle === DisplayStyle.TEXT_ONLY && <span>Log in</span> }
			{ displayStyle === DisplayStyle.ICON_ONLY && icon }
			{ displayStyle === DisplayStyle.ICON_AND_TEXT && (
				<span>{ icon } Log in</span>
			) }
		</div>
	);
};

export default CustomerAccountBlock;
