/**
 * External dependencies
 */
import { store as blockEditorStore } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import type { ProductCollectionAttributes } from '../types';
import ProductCollectionPlaceholder from './ProductCollectionPlaceholder';
import ProductCollectionContent from './ProductCollectionContent';
import './editor.scss';

const Edit = ( props: BlockEditProps< ProductCollectionAttributes > ) => {
	const { clientId } = props;

	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( blockEditorStore ).getBlocks( clientId ).length,
		[ clientId ]
	);

	if ( ! hasInnerBlocks ) {
		return <ProductCollectionPlaceholder { ...props } />;
	}

	return <ProductCollectionContent { ...props } />;
};

export default Edit;
