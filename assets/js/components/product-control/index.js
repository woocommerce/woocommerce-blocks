/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { find, escapeRegExp, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { SearchListControl, SearchListItem } from '@woocommerce/components';
import { Spinner, MenuItem } from '@wordpress/components';
import classnames from 'classnames';
import { IS_LARGE_CATALOG } from '@woocommerce/block-settings';
import {
	withProductVariations,
	withSearchedProducts,
	withSingleSelected,
} from '../../hocs';

/**
 * Internal dependencies
 */
import { IconRadioSelected, IconRadioUnselected } from '../icons';
import ErrorMessage from '../error-placeholder/error-message.js';
import './style.scss';

function getHighlightedName( name, search ) {
	if ( ! search ) {
		return name;
	}
	const re = new RegExp( escapeRegExp( search ), 'ig' );
	return name.replace( re, '<strong>$&</strong>' );
}

const getInteractionIcon = ( isSelected = false ) => {
	return isSelected ? <IconRadioSelected /> : <IconRadioUnselected />;
};

const ProductControl = ( {
	expandedProduct,
	error,
	isLoading,
	onChange,
	products,
	renderItem,
	selected,
	variations,
	variationsLoading,
} ) => {
	const defaultRenderItem = ( args ) => {
		const { item, search, depth = 0, isSelected, onSelect } = args;
		const variationsCount = item.variations ? item.variations.length : 0;
		const classes = classnames(
			'woocommerce-search-product__item',
			'woocommerce-search-list__item',
			`depth-${ depth }`,
			{
				'is-searching': search.length > 0,
				'is-skip-level': depth === 0 && item.parent !== 0,
				'is-variable': variationsCount > 0,
			}
		);

		const itemArgs = Object.assign( {}, args );
		delete itemArgs.isSingle;

		const a11yProps = {
			role: 'menuitemradio',
		};

		if ( item.breadcrumbs.length ) {
			a11yProps[ 'aria-label' ] = `${ item.breadcrumbs[ 0 ] }: ${
				item.name
			}`;
		}

		if ( variationsCount ) {
			a11yProps[ 'aria-expanded' ] = item.id === expandedProduct;
		}

		// Top level items custom rendering based on SearchListItem.
		if ( ! item.breadcrumbs.length ) {
			return [
				<MenuItem
					key={ `product-${ item.id }` }
					isSelected={ isSelected }
					{ ...itemArgs }
					{ ...a11yProps }
					className={ classes }
					onClick={ () => {
						onSelect( item )();
					} }
				>
					<span className="woocommerce-search-list__item-state">
						{ getInteractionIcon( isSelected ) }
					</span>

					<span className="woocommerce-search-list__item-label">
						<span
							className="woocommerce-search-list__item-name"
							dangerouslySetInnerHTML={ {
								__html: getHighlightedName( item.name, search ),
							} }
						/>
					</span>

					{ variationsCount ? (
						<span className="woocommerce-search-list__item-variation-count">
							{ sprintf(
								_n(
									'%d variation',
									'%d variations',
									variationsCount,
									'woo-gutenberg-products-block'
								),
								variationsCount
							) }
						</span>
					) : null }
				</MenuItem>,
				expandedProduct === item.id &&
					variationsCount > 0 &&
					variationsLoading && (
						<div
							key="loading"
							className={
								'woocommerce-search-list__item woocommerce-search-product__item' +
								'depth-1 is-loading is-not-active'
							}
						>
							<Spinner />
						</div>
					),
			];
		}

		if ( ! isEmpty( item.variation ) ) {
			item.name = item.variation;
		}

		return (
			<SearchListItem
				className={ classes }
				{ ...args }
				{ ...a11yProps }
			/>
		);
	};

	if ( error ) {
		return <ErrorMessage error={ error } />;
	}

	const currentVariations = variations[ expandedProduct ] || [];
	const currentList = [ ...products, ...currentVariations ];
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
	const selectedItem = selected && selected.length ? selected[ 0 ] : null;
	const selectedListItems = selectedItem
		? [ find( currentList, { id: selectedItem } ) ]
		: [];

	return (
		<Fragment>
			<SearchListControl
				className="woocommerce-products"
				list={ currentList }
				isLoading={ isLoading }
				isSingle
				selected={ selectedListItems }
				onChange={ onChange }
				renderItem={ renderItem || defaultRenderItem }
				onSearch={ IS_LARGE_CATALOG ? this.debouncedOnSearch : null }
				messages={ messages }
				isHierarchical
			/>
		</Fragment>
	);
};

ProductControl.propTypes = {
	/**
	 * Callback to update the selected products.
	 */
	onChange: PropTypes.func.isRequired,
	/**
	 * The ID of the currently expanded product.
	 */
	expandedProduct: PropTypes.number,
	/**
	 * Query args to pass to getProducts.
	 */
	queryArgs: PropTypes.object,
	/**
	 * Callback to render each item in the selection list, allows any custom object-type rendering.
	 */
	renderItem: PropTypes.func,
	/**
	 * The ID of the currently selected item (product or variation).
	 */
	selectedProduct: PropTypes.number,
};

ProductControl.defaultProps = {
	expandedProduct: null,
};

export default withSingleSelected(
	withSearchedProducts( withProductVariations( ProductControl ) )
);
