/* eslint-disable jsdoc/check-alignment */
/**
 * External dependencies
 */
import type { ReactElement } from 'react';
import {
	useBlockProps,
	InnerBlocks,
	BlockControls,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { filledCart, removeCart } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';
import { EditorProvider } from '@woocommerce/base-context';
import type { TemplateArray } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { useViewSwitcher, useForcedLayout } from '../shared';
import './editor.scss';

// Array of allowed block names.
const ALLOWED_BLOCKS = [
	'woocommerce/filled-mini-cart-contents-block',
	'woocommerce/empty-mini-cart-contents-block',
];

const views = [
	{
		view: 'woocommerce/filled-mini-cart-contents-block',
		label: __( 'Filled Mini Cart', 'woo-gutenberg-products-block' ),
		icon: <Icon icon={ filledCart } />,
	},
	{
		view: 'woocommerce/empty-mini-cart-contents-block',
		label: __( 'Empty Mini Cart', 'woo-gutenberg-products-block' ),
		icon: <Icon icon={ removeCart } />,
	},
];

interface Props {
	clientId: string;
}

const Edit = ( { clientId }: Props ): ReactElement => {
	const blockProps = useBlockProps( {
		/**
		 * This is a workaround for the Site Editor to calculate the
		 * correct height of the Mini Cart template part on the first load.
		 *
		 * @see https://github.com/woocommerce/woocommerce-gutenberg-products-block/pull/5825
		 */
		style: {
			minHeight: '100vh',
		},
	} );

	const defaultTemplate = [
		[ 'woocommerce/filled-mini-cart-contents-block', {}, [] ],
		[ 'woocommerce/empty-mini-cart-contents-block', {}, [] ],
	] as TemplateArray;

	const { currentView, component: ViewSwitcherComponent } = useViewSwitcher(
		clientId,
		views
	);

	useForcedLayout( {
		clientId,
		registeredBlocks: ALLOWED_BLOCKS,
		defaultTemplate,
	} );

	return (
		<div { ...blockProps }>
			<EditorProvider currentView={ currentView }>
				<BlockControls>{ ViewSwitcherComponent }</BlockControls>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ defaultTemplate }
					templateLock={ false }
				/>
			</EditorProvider>
			{ /**
			 * This is a workaround to style inner blocks using the color
			 * settings of the Mini Cart Contents block. It's possible to get
			 * the Mini Cart Contents block's attributes inside the inner blocks
			 * components, but we have 4 out of 7 inner blocks that inherit
			 * style from the Mini Cart Contents block, so we need to apply the
			 * styles here to avoid duplication.
			 *
			 * We only use this hack for the Site Editor. On the frontend, we
			 * manipulate the style using block attributes and inject the CSS
			 * via `wp_add_inline_style()` function.
			 */ }
			{ ( blockProps.style.color ||
				blockProps.style.backgroundColor ) && (
				<style>
					{ `
						.wc-block-mini-cart__footer .wc-block-mini-cart__footer-actions .wc-block-mini-cart__footer-checkout {
							color: ${ blockProps.style.backgroundColor };
							background-color: ${ blockProps.style.color };
							border-color: ${ blockProps.style.color };
						}
					` }
				</style>
			) }
		</div>
	);
};

export default Edit;

export const Save = (): JSX.Element => {
	return (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	);
};
