/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { useCollectionData } from '@woocommerce/base-context/hooks';
import { Disabled, PanelBody, SelectControl } from '@wordpress/components';
import FilterResetButton from '@woocommerce/base-components/filter-reset-button';
import { __ } from '@wordpress/i18n';
import { getBlockTypes, createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { EditProps, SelectOption } from './types';
import { getFormattedPrice } from './utils';

const Edit = ( { clientId, attributes, setAttributes }: EditProps ) => {
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );
	const [ options, setOptions ] = useState< SelectOption[] >();
	const blockProps = useBlockProps();
	const { results } = useCollectionData( {
		queryPrices: true,
		isEditor: true,
		queryState: {},
	} );

	useEffect( () => {
		setAttributes( {
			filterData: getFormattedPrice( results ),
		} );
	}, [ results, setAttributes ] );

	useEffect( () => {
		setOptions(
			getBlockTypes()
				.filter( ( block ) =>
					block?.ancestor?.includes(
						'woocommerce/collection-price-filter'
					)
				)
				.map( ( block ) => ( {
					label: block.title,
					value: block.name,
				} ) )
		);
	}, [] );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'woo-gutenberg-products-block' ) }
				>
					<SelectControl
						label={ __( 'Style', 'woo-gutenberg-products-block' ) }
						value={ attributes.filterStyle }
						options={ options }
						onChange={ ( filterStyle ) => {
							setAttributes( {
								filterStyle,
							} );
							replaceInnerBlocks( clientId, [
								createBlock( filterStyle ),
							] );
						} }
					></SelectControl>
				</PanelBody>
			</InspectorControls>
			<InnerBlocks
				template={ [ [ attributes.filterStyle ] ] }
				renderAppender={ () => null }
			/>
			<Disabled>
				<div className="actions">
					<FilterResetButton onClick={ () => false } />
				</div>
			</Disabled>
		</div>
	);
};

export default Edit;
