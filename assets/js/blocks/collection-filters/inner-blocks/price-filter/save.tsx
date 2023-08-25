/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from './block';

const Save = () => {
	return (
		<div { ...useBlockProps.save() }>
			<Block
				minPrice={ '' }
				maxPrice={ '' }
				minRange={ '' }
				maxRange={ '' }
			/>
		</div>
	);
};

export default Save;
