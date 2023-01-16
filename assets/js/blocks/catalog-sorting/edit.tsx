/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';
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

const Edit = () => {
	const blockProps = useBlockProps( {
		className: 'wc-block-catalog-sorting',
	} );

	return (
		<>
			<div { ...blockProps }>
				<Disabled>
					<CatalogSorting />
				</Disabled>
			</div>
		</>
	);
};

export default Edit;
