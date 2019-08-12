/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const OrderBySelect = ( { componentId, onChange, readOnly, value } ) => {
	const selectId = `wc-block-reviews-by-product__orderby__select-${ componentId }`;

	return (
		<p className="wc-block-reviews-by-product__orderby">
			<label className="wc-block-reviews-by-product__orderby__label" htmlFor={ selectId }>
				{ __( 'Order by', 'woo-gutenberg-products-block' ) }
			</label>
			<select // eslint-disable-line jsx-a11y/no-onchange
				id={ selectId }
				className="wc-block-reviews-by-product__orderby__select"
				onChange={ onChange }
				readOnly={ readOnly }
				value={ value }
			>
				<option value="most-recent">
					{ __( 'Most recent', 'woo-gutenberg-products-block' ) }
				</option>
				<option value="highest-rating">
					{ __( 'Highest rating', 'woo-gutenberg-products-block' ) }
				</option>
				<option value="lowest-rating">
					{ __( 'Lowest rating', 'woo-gutenberg-products-block' ) }
				</option>
			</select>
		</p>
	);
};

export default OrderBySelect;
