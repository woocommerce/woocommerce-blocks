/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useCollectionData } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import Block from './block';
import { EditProps } from './types';
import { getFormatedPrice } from './utils';

const Edit = ( { context }: EditProps ) => {
	const blockProps = useBlockProps();
	const { results } = useCollectionData( {
		queryPrices: true,
		isEditor: true,
		queryState: context.query,
	} );

	const { minPrice, maxPrice } = getFormatedPrice( results );

	return (
		<div { ...blockProps }>
			<Block
				minPrice={ minPrice }
				maxPrice={ maxPrice }
				minRange={ minPrice }
				maxRange={ maxPrice }
				isEditor={ true }
			/>
		</div>
	);
};

export default Edit;
