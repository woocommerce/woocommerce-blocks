/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { useFeedbackContext } from '../../context/feedback-context';
import FeedbackPrompt from './feedback-prompt.js';

const blocksFeedback = {
	'woocommerce/cart': __(
		'We are currently working on improving our checkout and providing merchants with tools and options to customize their checkout to their stores needs.',
		'woo-gutenberg-products-block'
	),
	'woocommerce/checkout': __(
		'We are currently working on improving our checkout and providing merchants with tools and options to customize their checkout to their stores needs.',
		'woo-gutenberg-products-block'
	),
};

/**
 * Adds a feedback prompt to the editor sidebar.
 *
 * @param {WPComponent} BlockEdit Original component.
 *
 * @return {WPComponent} Wrapped component.
 */
const withFeedbackPrompt = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const context = useFeedbackContext();
		// Context is not available here
		console.log( 'Context inside withFeedbackPrompt', context );
		const feedbackPromptText = blocksFeedback[ props.name ];

		if ( feedbackPromptText && props.isSelected ) {
			return (
				<Fragment>
					<BlockEdit { ...props } />
					<InspectorControls>
						<FeedbackPrompt text={ feedbackPromptText } />
					</InspectorControls>
				</Fragment>
			);
		}

		return <BlockEdit { ...props } />;
	};
}, 'withFeedbackPrompt' );

export default withFeedbackPrompt;
