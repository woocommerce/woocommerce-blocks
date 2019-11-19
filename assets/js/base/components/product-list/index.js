/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Pagination from '@woocommerce/base-components/pagination';
import ProductSortSelect from '@woocommerce/base-components/product-sort-select';
import ProductListItem from '@woocommerce/base-components/product-list-item';
import { useEffect, useRef } from '@wordpress/element';
import {
	useStoreProducts,
	useSynchronizedQueryState,
	useQueryStateByKey,
	usePrevious,
} from '@woocommerce/base-hooks';
import withScrollToTop from '@woocommerce/base-hocs/with-scroll-to-top';
import { useProductLayoutContext } from '@woocommerce/base-context/product-layout-context';

/**
 * Internal dependencies
 */
import './style.scss';
import NoProducts from './no-products';
import NoMatchingProducts from './no-matching-products';

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
		generateQuery( {
			attributes,
			sortValue,
			currentPage,
		} )
	);
	const previousPage = usePrevious( queryState.page );
	const isInitialized = useRef( false );
	useEffect( () => {
		// if page did not change in the query state then that means something
		// else changed and we should reset the current page number
		if ( previousPage === queryState.page && isInitialized.current ) {
			onPageChange( 1 );
		}
	}, [ queryState ] );

	const { products, totalProducts, productsLoading } = useStoreProducts(
		queryState
	);
	// These are possible filters.
	const [ productAttributes, setProductAttributes ] = useQueryStateByKey(
		'attributes',
		[]
	);
	const [ minPrice, setMinPrice ] = useQueryStateByKey( 'min_price' );
	const [ maxPrice, setMaxPrice ] = useQueryStateByKey( 'max_price' );

	useEffect( () => {
		if ( ! productsLoading ) {
			isInitialized.current = true;
		}
	}, [ productsLoading ] );
	const { layoutStyleClassPrefix } = useProductLayoutContext();
	const onPaginationChange = ( newPage ) => {
		scrollToTop( { focusableSelector: 'a, button' } );
		onPageChange( newPage );
		isInitialized.current = false;
	};

	const getClassnames = () => {
		const { columns, rows, className, alignButtons, align } = attributes;
		const alignClass = typeof align !== 'undefined' ? 'align' + align : '';

		return classnames(
			layoutStyleClassPrefix,
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
			{ ! hasProducts && hasFilters && (
				<NoMatchingProducts
					resetCallback={ () => {
						setProductAttributes( [] );
						setMinPrice( null );
						setMaxPrice( null );
					} }
				/>
			) }
			{ ! hasProducts && ! hasFilters && <NoProducts /> }
			{ hasProducts && (
				<ul className={ `${ layoutStyleClassPrefix }__products` }>
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
