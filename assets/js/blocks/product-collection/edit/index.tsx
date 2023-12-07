/**
 * External dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { useInstanceId } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import type {
	ProductCollectionAttributes,
	ProductCollectionQuery,
} from '../types';
import InspectorControls from './inspector-controls';
import { DEFAULT_ATTRIBUTES, INNER_BLOCKS_TEMPLATE } from '../constants';
import './editor.scss';
import { getDefaultValueOfInheritQueryFromTemplate } from '../utils';
import ToolbarControls from './toolbar-controls';

const Edit = ( props: BlockEditProps< ProductCollectionAttributes > ) => {
	const { attributes, setAttributes } = props;
	const { queryId } = attributes;

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: INNER_BLOCKS_TEMPLATE,
	} );

	const instanceId = useInstanceId( Edit );

	// We need this for multi-query block pagination.
	// Query parameters for each block are scoped to their ID.
	useEffect( () => {
		if ( ! Number.isFinite( queryId ) ) {
			setAttributes( { queryId: Number( instanceId ) } );
		}
	}, [ queryId, instanceId, setAttributes ] );

	/**
	 * Because of issue https://github.com/WordPress/gutenberg/issues/7342,
	 * We are using this workaround to set default attributes.
	 */
	useEffect( () => {
		setAttributes( {
			...DEFAULT_ATTRIBUTES,
			query: {
				...( DEFAULT_ATTRIBUTES.query as ProductCollectionQuery ),
				inherit: getDefaultValueOfInheritQueryFromTemplate(),
			},
			...( attributes as Partial< ProductCollectionAttributes > ),
		} );
		// We don't wanna add attributes as a dependency here.
		// Because we want this to run only once.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ setAttributes ] );

	/**
	 * If inherit is not a boolean, then we haven't set default attributes yet.
	 * We don't wanna render anything until default attributes are set.
	 * Default attributes are set in the useEffect above.
	 */
	if ( typeof attributes?.query?.inherit !== 'boolean' ) return null;

	return (
		<div { ...blockProps }>
			<InspectorControls { ...props } />
			<ToolbarControls { ...props } />
			<div { ...innerBlocksProps } />
		</div>
	);
};

export default Edit;
