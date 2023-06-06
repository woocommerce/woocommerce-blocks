/* eslint-disable @typescript-eslint/naming-convention */
/**
 * External dependencies
 */
import classnames from 'classnames';
import { memo, useState } from '@wordpress/element';
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
import {
	ProductCollectionAttributes,
	ProductCollectionQuery,
} from '@woocommerce/blocks/product-collection/types';

/**
 * Internal dependencies
 */
import { Taxonomy, ProductTemplateQuery } from './types';
import { productApiFetchMiddleware } from './products-middleware';

productApiFetchMiddleware();

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
	blockContextId: number;
	isHidden: boolean;
	setActiveBlockContextId: ( blockContextId: number ) => void;
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

// We have to build the tax query for the REST API and use as
// keys the taxonomies `rest_base` with the `term ids` as values.
const buildTaxQuery = (
	taxQuery: Record< string, number[] >,
	taxonomies?: Taxonomy[]
) =>
	Object.entries( taxQuery ).reduce(
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

const buildQuery = ( {
	query,
	taxonomies,
	templateCategory,
	page,
}: {
	query: ProductCollectionQuery;
	taxonomies?: Taxonomy[];
	templateCategory?: object[];
	page: number;
} ): ProductTemplateQuery => {
	const {
		perPage,
		offset = 0,
		orderBy,
		author,
		search,
		exclude,
		sticky,
		inherit,
		taxQuery,
		parents,
		pages,
		...restQueryArgs
	} = query;

	// There is no need to build the taxQuery if we inherit.
	const builtTaxQuery =
		taxQuery && ! inherit ? buildTaxQuery( taxQuery, taxonomies ) : {};
	return {
		page,
		offset: perPage ? perPage * ( page - 1 ) + offset : 0,
		orderby: orderBy,
		per_page: perPage,
		author: author || undefined,
		search: search || undefined,
		exclude: exclude?.length ? exclude : undefined,
		parent: parents?.length ? parents : undefined,
		// If sticky is not set, it will return all products in the results.
		// If sticky is set to `only`, it will limit the results to sticky products only.
		// If it is anything else, it will exclude sticky products from results. For the record the value stored is `exclude`.
		sticky: sticky === 'only' || undefined,
		// If `inherit` is truthy, adjust conditionally the query to create a better preview.
		categories:
			inherit && templateCategory ? templateCategory[ 0 ]?.id : undefined,
		...builtTaxQuery,
		...restQueryArgs,
	};
};

const ProductTemplateEdit = ( {
	clientId,
	context: {
		query,
		queryContext = [ { page: 1 } ],
		templateSlug,
		displayLayout: { type: layoutType, columns } = {
			type: 'flex',
			columns: 3,
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
	const { taxQuery, inherit } = query;
	const [ activeBlockContextId, setActiveBlockContextId ] = useState();
	const { blocks, products } = useSelect( ( select ) => {
		const { getBlocks } = select( blockEditorStore );
		const { getTaxonomies, getEntityRecords } = select( coreStore );
		const taxonomies = taxQuery
			? getTaxonomies( {
					type: 'product',
					per_page: -1,
					context: 'view',
			  } )
			: [];
		const templateCategory =
			inherit &&
			templateSlug?.startsWith( 'category-' ) &&
			getEntityRecords( 'postType', 'category', {
				context: 'view',
				per_page: 1,
				_fields: [ 'id' ],
				slug: templateSlug.replace( 'category-', '' ),
			} );

		const finalQuery = buildQuery( {
			query,
			page,
			taxonomies,
			templateCategory,
			source: 'product-collection',
		} );

		return {
			blocks: getBlocks( clientId ),
			products: getEntityRecords( 'postType', 'product', finalQuery ),
		};
	} );

	const hasLayoutFlex = layoutType === 'flex' && columns > 1;
	const blockProps = useBlockProps( {
		className: classnames(
			__unstableLayoutClassNames,
			'wc-block-product-template',
			{
				'is-flex-container': hasLayoutFlex,
				[ `columns-${ columns }` ]: hasLayoutFlex,
			}
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
				{ __( 'No products found.', 'woo-gutenberg-products-block' ) }
			</p>
		);
	}

	const buildContext = ( product ) => ( {
		postType: 'product',
		postId: product.id,
		product,
	} );

	// To avoid flicker when switching active block contexts, a preview is rendered
	// for each block context, but the preview for the active block context is hidden.
	// This ensures that when it is displayed again, the cached rendering of the
	// block preview is used, instead of having to re-render the preview from scratch.
	return (
		<ul { ...blockProps }>
			{ products.map( ( product ) => (
				<BlockContextProvider
					key={ product.id }
					value={ { ...buildContext( product ) } }
				>
					{ product.id ===
					( activeBlockContextId || products[ 0 ]?.id ) ? (
						<ProductTemplateInnerBlocks />
					) : null }
					<MemoizedProductTemplateBlockPreview
						blocks={ blocks }
						blockContextId={ product.id }
						setActiveBlockContextId={ setActiveBlockContextId }
						isHidden={
							product.id ===
							( activeBlockContextId || products[ 0 ]?.id )
						}
					/>
				</BlockContextProvider>
			) ) }
		</ul>
	);
};

export default ProductTemplateEdit;
