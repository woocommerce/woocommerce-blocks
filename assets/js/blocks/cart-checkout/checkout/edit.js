/**
 * External dependencies
 */
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useFeedbackContext } from '../../../context/feedback-context';
import Block from './block.js';
import './editor.scss';

const Edit = ( { attributes } ) => {
	const context = useFeedbackContext();
	// Context is available here
	console.log( 'Context inside <Edit>', context );
	const { className } = attributes;

	return (
		<div className={ className }>
			<Disabled>
				<Block attributes={ attributes } />
			</Disabled>
		</div>
	);
};

export default Edit;
