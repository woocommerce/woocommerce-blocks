/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { Toolbar } from '@wordpress/components';
import { Fragment, useState } from '@wordpress/element';
import TextToolbarButton from '@woocommerce/block-components/text-toolbar-button';

/**
 * Internal dependencies
 */
import FullCart from './components/full-cart';
import EmptyCart from './components/empty-cart';
import FeedbackPrompt from '../feedback-prompt';

const getInspectorControls = () => {
	return (
		<InspectorControls>
			<FeedbackPrompt
				text={ __(
					'We are currently working on improving our cart and providing merchants with tools and options to customize their cart to their stores needs.',
					'woo-gutenberg-products-block'
				) }
			/>
		</InspectorControls>
	);
};

/**
 * Component to handle edit mode of "Cart Block".
 */
const Cart = () => {
	const [ isFullCartMode, setFullCartMode ] = useState( true );

	const toggleFullCartMode = () => {
		setFullCartMode( ! isFullCartMode );
	};

	const getBlockControls = () => {
		return (
			<BlockControls className="wc-block-cart-toolbar">
				<Toolbar>
					<TextToolbarButton
						onClick={ toggleFullCartMode }
						isToggled={ isFullCartMode }
					>
						{ __( 'Full Cart', 'woo-gutenberg-products-block' ) }
					</TextToolbarButton>
					<TextToolbarButton
						onClick={ toggleFullCartMode }
						isToggled={ ! isFullCartMode }
					>
						{ __( 'Empty Cart', 'woo-gutenberg-products-block' ) }
					</TextToolbarButton>
				</Toolbar>
			</BlockControls>
		);
	};

	const cart = isFullCartMode ? <FullCart /> : <EmptyCart />;

	return (
		<Fragment>
			{ getBlockControls() }
			{ getInspectorControls() }
			{ cart }
		</Fragment>
	);
};

Cart.propTypes = {};

export default Cart;
