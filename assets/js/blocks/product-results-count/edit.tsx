/**
 * External dependencies
 */
import classNames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import type { BlockEditProps } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

export interface Attributes {
	className?: string;
}

const ProductResultsCount = (): JSX.Element => {
	return (
		<div>
			{ __( 'Showing 1-X of X results', 'woo-gutenberg-products-block' ) }
		</div>
	);
};

const Edit = ( { attributes }: BlockEditProps< Attributes > ) => {
	const { className } = attributes;
	const blockProps = useBlockProps( {
		className: classNames( 'wc-block-product-results-count', className ),
	} );

	return (
		<>
			<div { ...blockProps }>
				<ProductResultsCount />
			</div>
		</>
	);
};

export default Edit;
