/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Disabled } from '@wordpress/components';
import { useState } from '@wordpress/element';
import PropTypes from 'prop-types';
import { withFeedbackPrompt } from '@woocommerce/block-hocs';
import ViewSwitchControl from '@woocommerce/block-components/view-switch-control';

/**
 * Internal dependencies
 */
import FullCart from './full-cart';
import EmptyCart from './empty-cart';

/**
 * Component to handle edit mode of "Cart Block".
 */
const CartEditor = ( { className } ) => {
	const [ currentView, setCurrentView ] = useState( 'full' );

	return (
		<div className={ className }>
			<ViewSwitchControl
				label={ __( 'Edit', 'woo-gutenberg-products-block' ) }
				onChange={ ( view ) => setCurrentView( view ) }
				views={ [
					{
						value: 'full',
						name: __( 'Full Cart', 'woo-gutenberg-products-block' ),
					},
					{
						value: 'empty',
						name: __(
							'Empty Cart',
							'woo-gutenberg-products-block'
						),
					},
				] }
				selected={ currentView }
			/>
			{ currentView === 'full' && (
				<Disabled>
					<FullCart />
				</Disabled>
			) }
			<EmptyCart hidden={ currentView === 'full' } />
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
