/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useCollectionData } from '@woocommerce/base-context/hooks';

/**
 * Internal dependencies
 */
import Block from './block';
import { getFormattedPrice } from './utils';
import { EditProps } from './types';
import { Inspector } from './inspector';

const Edit = ( props: EditProps ) => {
	const blockProps = useBlockProps();
	const { results } = useCollectionData( {
		queryPrices: true,
		isEditor: true,
		queryState: {},
	} );
	const { minPrice, maxPrice } = getFormattedPrice( results );

	return (
		<div { ...blockProps }>
			<Inspector { ...props } />
			<Block
				minPrice={ minPrice }
				maxPrice={ maxPrice }
				minRange={ minPrice }
				maxRange={ maxPrice }
				isEditor={ true }
				{ ...props.attributes }
			/>
		</div>
	);
};

export default Edit;
