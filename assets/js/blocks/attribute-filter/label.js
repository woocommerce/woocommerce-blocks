/**
 * External dependencies
 */
import { _n, sprintf } from '@wordpress/i18n';
import Label from '@woocommerce/base-components/label';

/**
 * The label for an attribute term filter.
 */
const AttributeFilterLabel = ( { name, count } ) => {
	return (
		<>
			{ name }
			{ Number.isFinite( count ) && (
				<Label
					label={ count }
					screenReaderLabel={ sprintf(
						// translators: %s number of products.
						_n(
							'%s product',
							'%s products',
							count,
							'woo-gutenberg-products-block'
						),
						count
					) }
					wrapperElement="span"
					wrapperProps={ {
						className: 'wc-block-attribute-filter-list-count',
					} }
				/>
			) }
		</>
	);
};

export default AttributeFilterLabel;
