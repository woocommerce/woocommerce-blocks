/**
 * External dependencies
 */
import { Disabled, withSpokenMessages } from '@wordpress/components';

/**
 * Internal dependencies
 */
import Block from './block';

const Edit = () => {
	return (
		<>
			{
				<div>
					<Disabled>
						<Block />
					</Disabled>
				</div>
			}
		</>
	);
};

export default withSpokenMessages( Edit );
