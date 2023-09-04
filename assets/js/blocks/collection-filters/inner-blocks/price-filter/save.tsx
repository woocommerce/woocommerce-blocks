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
				minPrice={ 0 }
				maxPrice={ 0 }
				minRange={ 0 }
				maxRange={ 0 }
			/>
		</div>
	);
};

export default Save;
