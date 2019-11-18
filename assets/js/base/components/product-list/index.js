/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Pagination from '@woocommerce/base-components/pagination';
import ProductSortSelect from '@woocommerce/base-components/product-sort-select';
import ProductListItem from '@woocommerce/base-components/product-list-item';
import {
	useStoreProducts,
	useSynchronizedQueryState,
	useQueryStateByKey,
} from '@woocommerce/base-hooks';
import withScrollToTop from '@woocommerce/base-hocs/with-scroll-to-top';

/**
 * Internal dependencies
 */
import './style.scss';
import noProducts from './no-products';
import noMatchingProducts from './no-matching-products';

const generateQuery = ( { sortValue, currentPage, attributes } ) => {
	const { columns, rows } = attributes;
	const getSortArgs = ( orderName ) => {
		switch ( orderName ) {
			case 'menu_order':
			case 'popularity':
			case 'rating':
			case 'date':
			case 'price':
				return {
					orderby: orderName,
					order: 'asc',
				};
			case 'price-desc':
				return {
					orderby: 'price',
					order: 'desc',
				};
		}
	};
	return {
		...getSortArgs( sortValue ),
		per_page: columns * rows,
		page: currentPage,
	};
};

const ProductList = ( {
	attributes,
	currentPage,
	onPageChange,
	onSortChange,
	sortValue,
	scrollToTop,
} ) => {
	const [ queryState ] = useSynchronizedQueryState(
		generateQuery( { attributes, sortValue, currentPage } )
	);
	// @todo should add an <ErrorBoundary> in parent component to handle any
	// errors from the store and format etc.
	const { products, productsLoading, totalProducts } = useStoreProducts(
		queryState
	);
	// These are possible filters.
	const [ productAttributes, setProductAttributes ] = useQueryStateByKey(
		'attributes',
		[]
	);
	const [ minPrice, setMinPrice ] = useQueryStateByKey( 'min_price' );
	const [ maxPrice, setMaxPrice ] = useQueryStateByKey( 'max_price' );
	const onPaginationChange = ( newPage ) => {
		scrollToTop( { focusableSelector: 'a, button' } );
		onPageChange( newPage );
	};

	const getClassnames = () => {
		const { columns, rows, className, alignButtons, align } = attributes;
		const alignClass = typeof align !== 'undefined' ? 'align' + align : '';

		return classnames(
			'wc-block-grid',
			className,
			alignClass,
			'has-' + columns + '-columns',
			{
				'has-multiple-rows': rows > 1,
				'has-aligned-buttons': alignButtons,
			}
		);
	};

	const { contentVisibility } = attributes;
	const perPage = attributes.columns * attributes.rows;
	const totalPages = Math.ceil( totalProducts / perPage );
	const listProducts =
		productsLoading && ! products.length
			? Array.from( { length: perPage } )
			: products;
	const hasProducts = products.length !== 0 || productsLoading;
	const hasFilters =
		productAttributes.length > 0 ||
		Number.isFinite( minPrice ) ||
		Number.isFinite( maxPrice );

	return (
		<div className={ getClassnames() }>
			{ contentVisibility.orderBy && hasProducts && (
				<ProductSortSelect
					onChange={ onSortChange }
					value={ sortValue }
				/>
			) }
			{ ! hasProducts &&
				hasFilters &&
				noMatchingProducts( () => {
					setProductAttributes( [] );
					setMinPrice( null );
					setMaxPrice( null );
				} ) }
			{ ! hasProducts && ! hasFilters && noProducts() }
			{ hasProducts && (
				<ul className="wc-block-grid__products">
					{ listProducts.map( ( product = {}, i ) => (
						<ProductListItem
							key={ product.id || i }
							attributes={ attributes }
							product={ product }
						/>
					) ) }
				</ul>
			) }
			{ totalProducts > perPage && (
				<Pagination
					currentPage={ currentPage }
					onPageChange={ onPaginationChange }
					totalPages={ totalPages }
				/>
			) }
		</div>
	);
};

ProductList.propTypes = {
	attributes: PropTypes.object.isRequired,
	// From withScrollToTop.
	scrollToTop: PropTypes.func,
};

export default withScrollToTop( ProductList );
