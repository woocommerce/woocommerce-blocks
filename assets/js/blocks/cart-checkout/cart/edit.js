/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Disabled, ButtonGroup, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import PropTypes from 'prop-types';
import { withFeedbackPrompt } from '@woocommerce/block-hocs';

/**
 * Internal dependencies
 */
import FullCart from './full-cart';
import EmptyCart from './empty-cart';
import './editor.scss';

/**
 * Component to handle edit mode of "Cart Block".
 */
const CartEditor = ( { className } ) => {
	const [ isFullCartMode, setFullCartMode ] = useState( true );

	const getBlockControls = () => {
		return (
			<div className="wc-block-cart-view-switcher">
				<label
					id="wc-block-cart-view-switcher__label"
					htmlFor="wc-block-cart-view-switcher"
					className="wc-block-cart-view-switcher__label"
				>
					{ __( 'View:', 'woo-gutenberg-products-block' ) + ' ' }
				</label>
				<ButtonGroup
					id="wc-block-cart-view-switcher"
					aria-labelledby={ 'wc-block-cart-view-switcher__label' }
				>
					<Button
						isPrimary={ isFullCartMode }
						isSecondary={ ! isFullCartMode }
						onClick={ () => {
							setFullCartMode( true );
						} }
					>
						{ __( 'Full Cart', 'woo-gutenberg-products-block' ) }
					</Button>
					<Button
						isPrimary={ ! isFullCartMode }
						isSecondary={ isFullCartMode }
						onClick={ () => {
							setFullCartMode( false );
						} }
					>
						{ __( 'Empty Cart', 'woo-gutenberg-products-block' ) }
					</Button>
				</ButtonGroup>
			</div>
		);
	};

	return (
		<div className={ className }>
			{ getBlockControls() }
			{ isFullCartMode && (
				<Disabled>
					<FullCart />
				</Disabled>
			) }
			<EmptyCart hidden={ isFullCartMode } />
		</div>
	);
};

CartEditor.propTypes = {
	className: PropTypes.string,
};

export default withFeedbackPrompt(
	__(
		'We are currently working on improving our cart and providing merchants with tools and options to customize their cart to their stores needs.',
		'woo-gutenberg-products-block'
	)
)( CartEditor );
