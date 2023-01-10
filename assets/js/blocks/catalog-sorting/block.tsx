/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const CatalogSorting = () => {
	return (
		<select>
			<option>
				{ __( 'Default sorting', 'woo-gutenberg-products-block' ) }
			</option>
		</select>
	);
};

export default CatalogSorting;
