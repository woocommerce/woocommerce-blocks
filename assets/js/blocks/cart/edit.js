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
import { PanelBody, ToggleControl } from '@wordpress/components';
import { CartCheckoutCompatibilityNotice } from '@woocommerce/editor-components/compatibility-notices';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import { EditorProvider, CartProvider } from '@woocommerce/base-context';
import { previewCart } from '@woocommerce/resource-previews';
import { filledCart, removeCart } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './inner-blocks';
import './editor.scss';
import {
	addClassToBody,
	useViewSwitcher,
	useBlockPropsWithLocking,
	useForcedLayout,
	DefaultNotice,
} from '../cart-checkout-shared';
import { CartBlockContext } from './context';

// This is adds a class to body to signal if the selected block is locked
addClassToBody();

// Array of allowed block names.
const ALLOWED_BLOCKS = [
	'woocommerce/filled-cart-block',
	'woocommerce/empty-cart-block',
];

const views = [
	{
		view: 'woocommerce/filled-cart-block',
		label: __( 'Filled Cart', 'woo-gutenberg-products-block' ),
		icon: <Icon icon={ filledCart } />,
	},
	{
		view: 'woocommerce/empty-cart-block',
		label: __( 'Empty Cart', 'woo-gutenberg-products-block' ),
		icon: <Icon icon={ removeCart } />,
	},
];

const BlockSettings = ( { attributes, setAttributes } ) => {
	const { hasDarkControls } = attributes;
	return (
		<InspectorControls>
			<DefaultNotice page="cart" />
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

export const Edit = ( { className, attributes, setAttributes, clientId } ) => {
	const { hasDarkControls } = attributes;
	const { currentView, component: ViewSwitcherComponent } = useViewSwitcher(
		clientId,
		views
	);
	const defaultTemplate = [
		[ 'woocommerce/filled-cart-block', {}, [] ],
		[ 'woocommerce/empty-cart-block', {}, [] ],
	];
	const blockProps = useBlockPropsWithLocking( {
		className: classnames( className, 'wp-block-woocommerce-cart', {
			'is-editor-preview': attributes.isPreview,
		} ),
	} );
	useForcedLayout( {
		clientId,
		registeredBlocks: ALLOWED_BLOCKS,
		defaultTemplate,
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
				<EditorProvider
					currentView={ currentView }
					previewData={ { previewCart } }
				>
					<BlockSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
					<BlockControls __experimentalShareWithChildBlocks>
						{ ViewSwitcherComponent }
					</BlockControls>
					<CartBlockContext.Provider
						value={ {
							hasDarkControls,
						} }
					>
						<CartProvider>
							<InnerBlocks
								allowedBlocks={ ALLOWED_BLOCKS }
								template={ defaultTemplate }
								templateLock={ false }
							/>
						</CartProvider>
					</CartBlockContext.Provider>
				</EditorProvider>
			</BlockErrorBoundary>
			<CartCheckoutCompatibilityNotice blockName="cart" />
		</div>
	);
};

export const Save = () => {
	return (
		<div
			{ ...useBlockProps.save( {
				className: 'is-loading',
			} ) }
		>
			<InnerBlocks.Content />
		</div>
	);
};
