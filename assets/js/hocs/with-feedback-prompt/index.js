/**
 * External dependencies
 */
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import FeedbackPrompt from './feedback-prompt.js';

/**
 * Adds a feedback prompt to the editor sidebar.
 *
 * @param {WPComponent} BlockEdit Original component.
 *
 * @return {WPComponent} Wrapped component.
 */
const withFeedbackPrompt = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const {
			feedbackPromptText,
			showFeedbackPrompt,
			...blockEditProps
		} = props;

		if ( showFeedbackPrompt ) {
			return (
				<Fragment>
					<BlockEdit { ...blockEditProps } />
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
