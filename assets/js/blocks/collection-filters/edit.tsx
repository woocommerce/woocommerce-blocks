/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { useCollectionData } from '@woocommerce/base-context/hooks';
import { BlockEditProps } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { getFilterData, getQueryParams } from './utils';
import { BlockAttributes } from './types';

const Edit = ( {
	clientId,
	setAttributes,
}: BlockEditProps< BlockAttributes > ) => {
	const blockProps = useBlockProps();
	const innerBlockProps = useInnerBlocksProps( blockProps );

	// Get inner blocks by clientId
	const currentBlock = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getBlock( clientId );
	} );

	const { results } = useCollectionData( {
		...getQueryParams( currentBlock ),
		queryPrices: true,
		isEditor: true,
		queryState: {},
	} );

	useEffect( () => {
		setAttributes( {
			filterData: getFilterData( results ),
		} );
	}, [ results, setAttributes ] );

	return <nav { ...innerBlockProps } />;
};

export default Edit;
