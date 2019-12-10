/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import FeedbackPrompt from '../feedback-prompt';

/**
 * Internal dependencies
 */
import Block from './block.js';
import './editor.scss';

const Edit = ( { attributes } ) => {
	const { className } = attributes;

	const getInspectorControls = () => {
		return (
			<InspectorControls>
				<FeedbackPrompt
					text={ __(
						'We are currently working on improving our checkout and providing merchants with tools and options to customize their checkout to their stores needs.',
						'woo-gutenberg-products-block'
					) }
				/>
			</InspectorControls>
		);
	};

	return (
		<div className={ className }>
			{ getInspectorControls() }
			<Disabled>
				<Block attributes={ attributes } />
			</Disabled>
		</div>
	);
};

export default Edit;
