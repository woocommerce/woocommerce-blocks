/**
 * External dependencies
 */
import { ElementType } from 'react';
import { isExperimentalBuild } from '@woocommerce/block-settings';
import { stacks } from '@woocommerce/icons';
import { ProductQueryFeedbackPrompt } from '@woocommerce/editor-components/feedback-prompt';
import { getProducts } from '@woocommerce/editor-components/utils';
import { EditorBlock, ProductResponseItem } from '@woocommerce/types';
import { InspectorControls } from '@wordpress/block-editor';
import { registerBlockVariation } from '@wordpress/blocks';
import { useEffect, useState } from '@wordpress/element';
import {
	FormTokenField,
	Icon,
	PanelBody,
	Placeholder,
} from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import {
	INNER_BLOCKS_TEMPLATE,
	QUERY_DEFAULT_ATTRIBUTES,
	QUERY_LOOP_ID,
} from '../constants';
import { ProductQueryBlock } from '../types';
import { setQueryAttribute } from '../utils';

const VARIATION_NAME = 'woocommerce/product-query/handpicked-products';

if ( isExperimentalBuild() ) {
	registerBlockVariation( QUERY_LOOP_ID, {
		description: __(
			'A block that displays a selection of products in your store.',
			'woo-gutenberg-products-block'
		),
		name: VARIATION_NAME,
		/* translators: “Products“ is the name of the block. */
		title: __(
			'Hand-picked Products (Beta)',
			'woo-gutenberg-products-block'
		),
		isActive: ( blockAttributes ) =>
			blockAttributes.namespace === VARIATION_NAME,
		icon: (
			<Icon
				icon={ stacks }
				className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--stacks"
			/>
		),
		attributes: {
			...QUERY_DEFAULT_ATTRIBUTES,
			query: {
				...QUERY_DEFAULT_ATTRIBUTES.query,
				include: [],
			},
			namespace: VARIATION_NAME,
		},
		// Gutenberg doesn't support this type yet, discussion here:
		// https://github.com/WordPress/gutenberg/pull/43632
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		allowedControls: [],
		innerBlocks: INNER_BLOCKS_TEMPLATE,
		scope: [ 'inserter' ],
	} );
}

const ProductSelector = ( props: ProductQueryBlock ) => {
	const { query } = props.attributes;

	const [ productsList, setProductsList ] = useState< ProductResponseItem[] >(
		[]
	);

	useEffect( () => {
		getProducts( { selected: [] } ).then( ( results ) => {
			setProductsList( results as ProductResponseItem[] );
		} );
	}, [] );

	return (
		<FormTokenField
			disabled={ ! productsList.length }
			displayTransform={ ( token: string ) =>
				Number.isNaN( Number( token ) )
					? token
					: productsList.find(
							( product ) => product.id === Number( token )
					  )?.name || ''
			}
			label={ __( 'Pick some products', 'woo-gutenberg-products-block' ) }
			onChange={ ( values ) => {
				setQueryAttribute( props, {
					include: values
						.map(
							( nameOrId ) =>
								productsList.find(
									( product ) =>
										product.name === nameOrId ||
										product.id === Number( nameOrId )
								)?.id
						)
						.filter( Boolean )
						.map( String ),
				} );
			} }
			suggestions={ productsList.map( ( product ) => product.name ) }
			validateInput={ ( value: string ) =>
				productsList.find( ( product ) => product.name === value )
			}
			value={
				! productsList.length
					? [ __( 'Loading…', 'woo-gutenberg-products-block' ) ]
					: query?.include || []
			}
			__experimentalExpandOnFocus={ true }
		/>
	);
};

export const withProductQueryControls =
	< T extends EditorBlock< T > >( BlockEdit: ElementType ) =>
	( props: ProductQueryBlock ) => {
		return props.name === QUERY_LOOP_ID &&
			props.attributes.namespace === VARIATION_NAME ? (
			<>
				<InspectorControls>
					<PanelBody
						title={ __(
							'Content',
							'woo-gutenberg-products-block'
						) }
					>
						<ProductSelector { ...props } />
					</PanelBody>
				</InspectorControls>
				{
					// Hacky temporary solution to display the feedback prompt
					// at the bottom of the inspector controls
				 }
				<InspectorControls __experimentalGroup="color">
					<ProductQueryFeedbackPrompt />
				</InspectorControls>
				{ props.attributes?.query?.include?.length === 0 ? (
					<Placeholder
						icon={
							<Icon
								icon={ stacks }
								className="wc-block-editor-components-block-icon wc-block-editor-components-block-icon--stacks"
							/>
						}
						instructions={ __(
							'Please open the inspector controls and select which products you would like to display.',
							'woo-gutenberg-products-block'
						) }
						label={ __(
							'Hand-picked Products block',
							'woo-gutenberg-products-block'
						) }
					/>
				) : (
					<BlockEdit { ...props } />
				) }
			</>
		) : (
			<BlockEdit { ...props } />
		);
	};

addFilter( 'editor.BlockEdit', QUERY_LOOP_ID, withProductQueryControls );
