/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { Skeleton } from '@woocommerce/base-components/skeleton';
import { Tooltip } from '@wordpress/components';

const PagerButton = () => {
	return <button className="wc-block-product-gallery-pager-button">1</button>;
};

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-editor-product-gallery-pager',
	} );

	return (
		<div { ...blockProps }>
			<ul className="wc-block-editor-product-gallery-pager__pager">
				<li>1</li>
				<li>2</li>
				<li>3</li>
				<li>4</li>
			</ul>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
