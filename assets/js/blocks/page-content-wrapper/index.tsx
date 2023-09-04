/**
 * External dependencies
 */
import {
	registerBlockType,
	InnerBlockTemplate,
	BlockAttributes,
} from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { page } from '@wordpress/icons';
import { CHECKOUT_PAGE_ID, CART_PAGE_ID } from '@woocommerce/block-settings';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import metadata from './block.json';
import './editor.scss';

const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: BlockAttributes;
	setAttributes: ( attrs: BlockAttributes ) => void;
} ) => {
	const TEMPLATE: InnerBlockTemplate[] = [
		[ 'core/post-title', { align: 'wide' } ],
		[ 'core/post-content', { align: 'wide' } ],
	];

	const blockProps = useBlockProps( {
		className: 'wp-block-woocommerce-page-content-wrapper',
	} );

	useEffect( () => {
		if ( ! attributes.postId && attributes.page ) {
			let postId = 0;

			if ( attributes.page === 'checkout' ) {
				postId = CHECKOUT_PAGE_ID;
			}

			if ( attributes.page === 'cart' ) {
				postId = CART_PAGE_ID;
			}

			setAttributes( { postId } );
		}
	}, [ attributes, setAttributes ] );

	return (
		<div { ...blockProps }>
			<InnerBlocks template={ TEMPLATE } />
		</div>
	);
};

registerBlockType( metadata, {
	icon: {
		src: page,
	},
	edit: Edit,
	save: () => <InnerBlocks.Content />,
} );
