/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import Block from './block';

const Edit = () => {
	const blockProps = useBlockProps();

	return (
		<div { ...blockProps }>
			<Block
				minPrice={ 0 }
				maxPrice={ 90 }
				minRange={ 0 }
				maxRange={ 90 }
			/>
		</div>
	);
};

export default Edit;
