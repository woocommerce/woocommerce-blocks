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

	return (
		<div { ...blockProps }>
			<Inspector { ...props } />
			<Block
				{ ...getFormattedPrice( results ) }
				{ ...props.attributes }
			/>
		</div>
	);
};

export default Edit;
