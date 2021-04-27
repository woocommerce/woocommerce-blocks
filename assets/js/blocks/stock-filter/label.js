/**
 * External dependencies
 */
import { _n, sprintf } from '@wordpress/i18n';
import Label from '@woocommerce/base-components/label';

/**
 * The label for an stock status filter.
 *
 * @param {Object} props Incoming props for the component.
 * @param {string} props.name The name for the label.
 * @param {number} props.count The count of products this status is attached to.
 */
const StockFilterLabel = ( { name, count } ) => {
	return (
		<>
			{ name }
			{ Number.isFinite( count ) && (
				<Label
					label={ count }
					screenReaderLabel={ sprintf(
						/* translators: %s number of products. */
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
						className: 'wc-block-stock-filter-list-count',
					} }
				/>
			) }
		</>
	);
};

export default StockFilterLabel;
