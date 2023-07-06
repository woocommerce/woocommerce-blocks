/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Skeleton } from '@woocommerce/base-components/skeleton';
import { Tooltip } from '@wordpress/components';

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-editor-product-gallery_next-previous-buttons',
	} );

	return (
		<div { ...blockProps }>
			<Tooltip
				text="This will display the Next/Previous buttons for the product gallery."
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
