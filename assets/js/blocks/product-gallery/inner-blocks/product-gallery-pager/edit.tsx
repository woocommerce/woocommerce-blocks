/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Skeleton } from '@woocommerce/base-components/skeleton';
import { Tooltip } from '@wordpress/components';

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-editor-product-gallery_pager',
	} );

	return (
		<div { ...blockProps }>
			<Tooltip
				text={ __(
					'This will display the Pager for the product gallery.',
					'woo-gutenberg-products-block'
				) }
				position="bottom right"
			>
				<div className="wc-block-editor-container">
					<Skeleton numberOfLines={ 1 } />
				</div>
			</Tooltip>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
