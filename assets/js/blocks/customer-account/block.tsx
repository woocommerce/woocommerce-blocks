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
import {
	Attributes,
	CustomerAccountDisplayValue,
	CustomerAccountIconValue,
} from './types';

export const CustomerAccountBlock = ( {
	attributes,
}: {
	attributes: Attributes;
} ): JSX.Element => {
	const { customerAccountDisplayStyle, customerAccountIconStyle } =
		attributes;

	const icon =
		customerAccountIconStyle === CustomerAccountIconValue.ALT ? (
			<Icon icon={ customerAccountStyleAlt } size={ 16 } />
		) : (
			<Icon icon={ customerAccountStyle } size={ 16 } />
		);

	return (
		<div>
			{ customerAccountDisplayStyle ===
				CustomerAccountDisplayValue.TEXT_ONLY && <span>Log in</span> }
			{ customerAccountDisplayStyle ===
				CustomerAccountDisplayValue.ICON_ONLY && icon }
			{ customerAccountDisplayStyle ===
				CustomerAccountDisplayValue.ICON_AND_TEXT && (
				<span>{ icon } Log in</span>
			) }
		</div>
	);
};

export default CustomerAccountBlock;
