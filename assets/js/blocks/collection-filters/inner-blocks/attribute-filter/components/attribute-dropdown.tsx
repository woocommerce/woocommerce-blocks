/**
 * External dependencies
 */
import FormTokenField from '@woocommerce/base-components/form-token-field';
import { AttributeObject } from '@woocommerce/types';
import { __, sprintf } from '@wordpress/i18n';
import { Icon, chevronDown } from '@wordpress/icons';

type Props = {
	attributeObject: Partial< AttributeObject > | undefined;
};
export const AttributeDropdown = ( { attributeObject }: Props ) => (
	<div className="attribute-dropdown">
		<FormTokenField
			suggestions={ [] }
			placeholder={ sprintf(
				/* translators: %s attribute name. */
				__( 'Select %s', 'woo-gutenberg-products-block' ),
				attributeObject?.label
			) }
			onChange={ () => null }
			value={ [] }
		/>
		<Icon icon={ chevronDown } size={ 30 } />
	</div>
);
