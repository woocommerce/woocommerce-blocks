/* eslint-disable @typescript-eslint/naming-convention */
/**
 * External dependencies
 */
import classnames from 'classnames';
import { memo, useMemo, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import {
	BlockContextProvider,
	__experimentalUseBlockPreview as useBlockPreview,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { Spinner } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import type { BlockEditProps } from '@wordpress/blocks';
import { ProductCollectionAttributes } from '@woocommerce/blocks/product-collection/types';
import { getSettingWithCoercion } from '@woocommerce/settings';
import { isNumber } from '@woocommerce/types';

const ProductTemplateInnerBlocks = () => {
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'wc-block-product' },
		{ __unstableDisableLayoutClassNames: true }
	);
	return <li { ...innerBlocksProps } />;
};

const ProductTemplateBlockPreview = ( {
	blocks,
	blockContextId,
	isHidden,
	setActiveBlockContextId,
}: {
	blocks: object[];
	blockContextId: string;
	isHidden: boolean;
	setActiveBlockContextId: ( blockContextId: string ) => void;
} ) => {
	const blockPreviewProps = useBlockPreview( {
		blocks,
		props: {
			className: 'wc-block-product',
		},
	} );

	const handleOnClick = () => {
		setActiveBlockContextId( blockContextId );
	};

	const style = {
		display: isHidden ? 'none' : undefined,
	};

	return (
		<li
			{ ...blockPreviewProps }
			tabIndex={ 0 }
			// eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
			role="button"
			onClick={ handleOnClick }
			onKeyPress={ handleOnClick }
			style={ style }
		/>
	);
};

const MemoizedProductTemplateBlockPreview = memo( ProductTemplateBlockPreview );

const ProductTemplateEdit = ( {
	clientId,
	context: {
		query: {
			perPage,
			offset = 0,
			order,
			orderBy,
			search,
			exclude,
			inherit,
			taxQuery,
			pages,
			...restQueryArgs
		},
		queryContext = [ { page: 1 } ],
		templateSlug,
		displayLayout: { type: layoutType, columns, shrinkColumns } = {
			type: 'flex',
			columns: 3,
			shrinkColumns: false,
		},
	},
	__unstableLayoutClassNames,
}: BlockEditProps< {
	clientId: string;
} > & {
	context: ProductCollectionAttributes;
	__unstableLayoutClassNames: string;
} ) => {
	const [ { page } ] = queryContext;
	const [ activeBlockContextId, setActiveBlockContextId ] = useState();
	const postType = 'product';
	const loopShopPerPage = getSettingWithCoercion(
		'loopShopPerPage',
		12,
		isNumber
	);
	const { products, blocks } = useSelect(
		( select ) => {
			const { getEntityRecords, getTaxonomies } = select( coreStore );
			const { getBlocks } = select( blockEditorStore );
			const taxonomies = getTaxonomies( {
				type: postType,
				per_page: -1,
				context: 'view',
			} );
			const templateCategory =
				inherit &&
				templateSlug?.startsWith( 'category-' ) &&
				getEntityRecords( 'taxonomy', 'category', {
					context: 'view',
					per_page: 1,
					_fields: [ 'id' ],
					slug: templateSlug.replace( 'category-', '' ),
				} );
			const query: Record< string, unknown > = {
				postType,
				offset: perPage ? perPage * ( page - 1 ) + offset : 0,
				order,
				orderby: orderBy,
			};
			// There is no need to build the taxQuery if we inherit.
			if ( taxQuery && ! inherit ) {
				// We have to build the tax query for the REST API and use as
				// keys the taxonomies `rest_base` with the `term ids` as values.
				const builtTaxQuery = Object.entries( taxQuery ).reduce(
					( accumulator, [ taxonomySlug, terms ] ) => {
						const taxonomy = taxonomies?.find(
							( { slug } ) => slug === taxonomySlug
						);
						if ( taxonomy?.rest_base ) {
							accumulator[ taxonomy?.rest_base ] = terms;
						}
						return accumulator;
					},
					{}
				);
				if ( !! Object.keys( builtTaxQuery ).length ) {
					Object.assign( query, builtTaxQuery );
				}
			}
			if ( perPage ) {
				query.per_page = perPage;
			}
			if ( search ) {
				query.search = search;
			}
			if ( exclude?.length ) {
				query.exclude = exclude;
			}
			// If `inherit` is truthy, adjust conditionally the query to create a better preview.
			if ( inherit ) {
				if ( templateCategory ) {
					query.categories = templateCategory[ 0 ]?.id;
				}
				query.per_page = loopShopPerPage;
			}
			return {
				products: getEntityRecords( 'postType', postType, {
					...query,
					...restQueryArgs,
				} ),
				blocks: getBlocks( clientId ),
			};
		},
		[
			perPage,
			page,
			offset,
			order,
			orderBy,
			clientId,
			search,
			postType,
			exclude,
			inherit,
			templateSlug,
			taxQuery,
			restQueryArgs,
		]
	);
	const blockContexts = useMemo(
		() =>
			products?.map( ( product ) => ( {
				postType: product.type,
				postId: product.id,
			} ) ),
		[ products ]
	);

	const hasLayoutFlex = layoutType === 'flex' && columns > 1;
	let customClassName = '';
	if ( hasLayoutFlex ) {
		const dynamicGrid = `wc-block-product-template__responsive columns-${ columns }`;
		const staticGrid = `is-flex-container columns-${ columns }`;

		customClassName = shrinkColumns ? dynamicGrid : staticGrid;
	}

	const blockProps = useBlockProps( {
		className: classnames(
			__unstableLayoutClassNames,
			'wc-block-product-template',
			customClassName
		),
	} );

	if ( ! products ) {
		return (
			<p { ...blockProps }>
				<Spinner />
			</p>
		);
	}

	if ( ! products.length ) {
		return (
			<p { ...blockProps }>
				{ ' ' }
				{ __( 'No results found.', 'woo-gutenberg-products-block' ) }
			</p>
		);
	}

	// To avoid flicker when switching active block contexts, a preview is rendered
	// for each block context, but the preview for the active block context is hidden.
	// This ensures that when it is displayed again, the cached rendering of the
	// block preview is used, instead of having to re-render the preview from scratch.
	return (
		<ul { ...blockProps }>
			{ blockContexts &&
				blockContexts.map( ( blockContext ) => (
					<BlockContextProvider
						key={ blockContext.postId }
						value={ blockContext }
					>
						{ blockContext.postId ===
						( activeBlockContextId ||
							blockContexts[ 0 ]?.postId ) ? (
							<ProductTemplateInnerBlocks />
						) : null }
						<MemoizedProductTemplateBlockPreview
							blocks={ blocks }
							blockContextId={ blockContext.postId }
							setActiveBlockContextId={ setActiveBlockContextId }
							isHidden={
								blockContext.postId ===
								( activeBlockContextId ||
									blockContexts[ 0 ]?.postId )
							}
						/>
					</BlockContextProvider>
				) ) }
		</ul>
	);
};

export default ProductTemplateEdit;
