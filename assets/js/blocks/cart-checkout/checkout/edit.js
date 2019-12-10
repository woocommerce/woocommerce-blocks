/**
 * External dependencies
 */
import { Disabled } from '@wordpress/components';
import { withFeedbackPrompt } from '@woocommerce/block-hocs';

/**
 * Internal dependencies
 */
import Block from './block.js';
import './editor.scss';

const Edit = ( { attributes } ) => {
	const { className } = attributes;

	return (
		<div className={ className }>
			<Disabled>
				<Block attributes={ attributes } />
			</Disabled>
		</div>
	);
};

export default withFeedbackPrompt( Edit );
