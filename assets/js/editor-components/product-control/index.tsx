/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import {
	isEmpty,
	ProductResponseItem,
	ProductResponseVariationsItem,
} from '@woocommerce/types';
import {
	SearchListControl,
	SearchListItem,
} from '@woocommerce/editor-components/search-list-control';
import { withInstanceId } from '@wordpress/compose';
import {
	withProductVariations,
	withSearchedProducts,
	withTransformSingleSelectToMultipleSelect,
} from '@woocommerce/block-hocs';
import ErrorMessage from '@woocommerce/editor-components/error-placeholder/error-message';
import classNames from 'classnames';
import ExpandableSearchListItem from '@woocommerce/editor-components/expandable-search-list-item/expandable-search-list-item';
import { ErrorObject } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import './style.scss';
import { SearchListItem as SearchListItemType } from '../search-list-control/types';

const messages = {
	list: __( 'Products', 'woo-gutenberg-products-block' ),
	noItems: __(
		"Your store doesn't have any products.",
		'woo-gutenberg-products-block'
	),
	search: __(
		'Search for a product to display',
		'woo-gutenberg-products-block'
	),
	updated: __(
		'Product search results updated.',
		'woo-gutenberg-products-block'
	),
};

type ProductControlProps = {
	expandedProduct?: number | null;
	error: ErrorObject | null;
	instanceId?: number;
	isCompact?: boolean;
	isLoading?: boolean;
	onChange: ( selected: SearchListItemType[] ) => void;
	onSearch?: ( search: string ) => void;
	products: ProductResponseItem[];
	renderItem?: ( args: unknown ) => JSX.Element;
	selected?: number[] | number | string;
	showVariations?: boolean;
	variations: { [ key: string ]: ProductResponseVariationsItem[] };
	variationsLoading?: boolean;
};

const ProductControl = ( {
	expandedProduct = null,
	error,
	instanceId,
	isCompact = false,
	isLoading,
	onChange,
	onSearch,
	products,
	renderItem,
	selected = [],
	showVariations = false,
	variations,
	variationsLoading,
}: ProductControlProps ) => {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore - SearchListControl needs refactoring to take a generic to determine the type of the list items.
	const renderItemWithVariations = ( args ) => {
		const { item, search, depth = 0, isSelected, onSelect } = args;
		const variationsCount =
			item.variations && Array.isArray( item.variations )
				? item.variations.length
				: 0;
		const classes = classNames(
			'woocommerce-search-product__item',
			'woocommerce-search-list__item',
			`depth-${ depth }`,
			'has-count',
			{
				'is-searching': search.length > 0,
				'is-skip-level': depth === 0 && item.parent !== 0,
				'is-variable': variationsCount > 0,
			}
		);

		// Top level items custom rendering based on SearchListItem.
		if ( ! item.breadcrumbs.length ) {
			return (
				<ExpandableSearchListItem
					{ ...args }
					className={ classNames( classes, {
						'is-selected': isSelected,
					} ) }
					isSelected={ isSelected }
					item={ item }
					onSelect={ () => {
						return () => {
							onSelect( item )();
						};
					} }
					isLoading={ isLoading || variationsLoading }
					countLabel={
						item.variations.length > 0
							? sprintf(
									/* translators: %1$d is the number of variations of a product product. */
									__(
										'%1$d variations',
										'woo-gutenberg-products-block'
									),
									item.variations.length
							  )
							: null
					}
					name={ `products-${ instanceId }` }
					aria-label={ sprintf(
						/* translators: %1$s is the product name, %2$d is the number of variations of that product. */
						_n(
							'%1$s, has %2$d variation',
							'%1$s, has %2$d variations',
							item.variations.length,
							'woo-gutenberg-products-block'
						),
						item.name,
						item.variations.length
					) }
				/>
			);
		}

		const itemArgs = isEmpty( item.variation )
			? args
			: {
					...args,
					item: {
						...args.item,
						name: item.variation,
					},
					'aria-label': `${ item.breadcrumbs[ 0 ] }: ${ item.variation }`,
			  };

		return (
			<SearchListItem
				{ ...itemArgs }
				className={ classes }
				name={ `variations-${ instanceId }` }
			/>
		);
	};

	const getRenderItemFunc = () => {
		if ( renderItem ) {
			return renderItem;
		} else if ( showVariations ) {
			return renderItemWithVariations;
		}
		return () => {
			return null;
		};
	};

	if ( error ) {
		return <ErrorMessage error={ error } />;
	}

	const currentVariations =
		variations && expandedProduct !== null && variations[ expandedProduct ]
			? variations[ expandedProduct ]
			: [];
	const currentList = [ ...products, ...currentVariations ];

	return (
		<SearchListControl
			className="woocommerce-products"
			// @ts-expect-error - It looks like ProductResponse does not fulfill the SearchListItemProps interface. This needs to be fixed.
			list={ currentList }
			isCompact={ isCompact }
			isLoading={ isLoading }
			isSingle
			// @ts-expect-error - It looks like ProductResponse does not fulfill the SearchListItemProps interface. This needs to be fixed.
			selected={ currentList.filter( ( { id } ) => {
				if (
					Array.isArray( selected ) ||
					typeof selected === 'string'
				) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore - passing a number to includes won't crash it, so we can ignore this to avoid changing runtime behaviour.
					return selected.includes( id );
				}

				return selected === id;
			} ) }
			onChange={ onChange }
			renderItem={ getRenderItemFunc() }
			onSearch={ onSearch }
			messages={ messages }
			isHierarchical
		/>
	);
};

export default withTransformSingleSelectToMultipleSelect(
	withSearchedProducts(
		withProductVariations( withInstanceId( ProductControl ) )
	)
);
