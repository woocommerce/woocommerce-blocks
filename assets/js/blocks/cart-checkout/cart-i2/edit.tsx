/* tslint:disable */
/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { CartCheckoutFeedbackPrompt } from '@woocommerce/editor-components/feedback-prompt';
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	BlockControls,
} from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Notice } from '@wordpress/components';
import { CartCheckoutCompatibilityNotice } from '@woocommerce/editor-components/compatibility-notices';
import { CART_PAGE_ID } from '@woocommerce/block-settings';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import {
	EditorProvider,
	useEditorContext,
	CartProvider,
} from '@woocommerce/base-context';
import { createInterpolateElement } from '@wordpress/element';
import { getAdminLink } from '@woocommerce/settings';
import { previewCart } from '@woocommerce/resource-previews';
import { Icon, filledCart, removeCart } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import './editor.scss';
import { addClassToBody, useBlockPropsWithLocking } from './hacks';
import { useViewSwitcher } from './use-view-switcher';
import type { Attributes } from './types';
import { CartBlockContext } from './context';

// This is adds a class to body to signal if the selected block is locked
addClassToBody();

// Array of allowed block names.
const ALLOWED_BLOCKS: string[] = [
	'woocommerce/filled-cart-block',
	'woocommerce/empty-cart-block',
];

const BlockSettings = ( {
	attributes,
	setAttributes,
}: {
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => undefined;
} ): JSX.Element => {
	const { hasDarkControls } = attributes;
	const { currentPostId } = useEditorContext();
	return (
		<InspectorControls>
			{ currentPostId !== CART_PAGE_ID && (
				<Notice
					className="wc-block-cart__page-notice"
					isDismissible={ false }
					status="warning"
				>
					{ createInterpolateElement(
						__(
							'If you would like to use this block as your default cart you must update your <a>page settings in WooCommerce</a>.',
							'woo-gutenberg-products-block'
						),
						{
							a: (
								// eslint-disable-next-line jsx-a11y/anchor-has-content
								<a
									href={ getAdminLink(
										'admin.php?page=wc-settings&tab=advanced'
									) }
									target="_blank"
									rel="noopener noreferrer"
								/>
							),
						}
					) }
				</Notice>
			) }
			<PanelBody title={ __( 'Style', 'woo-gutenberg-products-block' ) }>
				<ToggleControl
					label={ __(
						'Dark mode inputs',
						'woo-gutenberg-products-block'
					) }
					help={ __(
						'Inputs styled specifically for use on dark background colors.',
						'woo-gutenberg-products-block'
					) }
					checked={ hasDarkControls }
					onChange={ () =>
						setAttributes( {
							hasDarkControls: ! hasDarkControls,
						} )
					}
				/>
			</PanelBody>
			<CartCheckoutFeedbackPrompt />
		</InspectorControls>
	);
};

/**
 * Component to handle edit mode of "Cart Block".
 */
export const Edit = ( {
	className,
	attributes,
	setAttributes,
	clientId,
}: {
	className: string;
	attributes: Attributes;
	setAttributes: ( attributes: Record< string, unknown > ) => undefined;
	clientId: string;
} ): JSX.Element => {
	const { currentView, component: ViewSwitcherComponent } = useViewSwitcher(
		clientId,
		[
			{
				view: 'woocommerce/filled-cart-block',
				label: __( 'Filled Cart', 'woo-gutenberg-products-block' ),
				icon: <Icon srcElement={ filledCart } />,
			},
			{
				view: 'woocommerce/empty-cart-block',
				label: __( 'Empty Cart', 'woo-gutenberg-products-block' ),
				icon: <Icon srcElement={ removeCart } />,
			},
		]
	);
	const cartClassName = classnames( {
		'has-dark-controls': attributes.hasDarkControls,
	} );
	const defaultTemplate = [
		[ 'woocommerce/filled-cart-block', {}, [] ],
		[ 'woocommerce/empty-cart-block', {}, [] ],
	];
	const blockProps = useBlockPropsWithLocking( {
		className: classnames( className, 'wp-block-woocommerce-cart', {
			'is-editor-preview': attributes.isPreview,
		} ),
	} );

	return (
		<div { ...blockProps }>
			<BlockErrorBoundary
				header={ __(
					'Cart Block Error',
					'woo-gutenberg-products-block'
				) }
				text={ __(
					'There was an error whilst rendering the cart block. If this problem continues, try re-creating the block.',
					'woo-gutenberg-products-block'
				) }
				showErrorMessage={ true }
				errorMessagePrefix={ __(
					'Error message:',
					'woo-gutenberg-products-block'
				) }
			>
				<EditorProvider previewData={ { previewCart } }>
					<BlockSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					<BlockControls __experimentalShareWithChildBlocks>
						<ViewSwitcherComponent />
					</BlockControls>
					<CartBlockContext.Provider
						value={ {
							currentView,
						} }
					>
						<CartProvider>
							<div className={ cartClassName }>
								<InnerBlocks
									allowedBlocks={ ALLOWED_BLOCKS }
									template={ defaultTemplate }
									templateLock="insert"
								/>
							</div>
						</CartProvider>
					</CartBlockContext.Provider>
				</EditorProvider>
			</BlockErrorBoundary>
			<CartCheckoutCompatibilityNotice blockName="cart" />
		</div>
	);
};

export const Save = (): JSX.Element => {
	return (
		<div
			{ ...useBlockProps.save( {
				className: 'wc-block-cart is-loading',
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
};
