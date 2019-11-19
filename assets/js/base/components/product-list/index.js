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
	usePrevious,
	useStoreProducts,
	useSynchronizedQueryState,
} from '@woocommerce/base-hooks';
import withScrollToTop from '@woocommerce/base-hocs/with-scroll-to-top';
import { useProductLayoutContext } from '@woocommerce/base-context/product-layout-context';
import isShallowEqual from '@wordpress/is-shallow-equal';

/**
 * Internal dependencies
 */
import './style.scss';

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

/**
 * Given a query state, returns the same query without the attributes related to
 * pagination and sorting.
 *
 * @param {Object} query Query to extract the attributes from.
 *
 * @return {Object} Same query without pagination and sorting attributes.
 */

const extractPaginationAndSortAttributes = ( query ) => {
	/* eslint-disable-next-line no-unused-vars, camelcase */
	const { order, orderby, page, per_page, ...totalQuery } = query;
	return totalQuery;
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
	const results = useStoreProducts( queryState );
	const { products, productsLoading } = results;
	const totalProducts = parseInt( results.totalProducts );

	useEffect( () => {
		if ( ! productsLoading ) {
			isInitialized.current = true;
		}
	}, [ productsLoading ] );
	const { layoutStyleClassPrefix } = useProductLayoutContext();
	const totalQuery = extractPaginationAndSortAttributes( queryState );
	// Only update previous query totals if the query is different and
	// the total number of products is a finite number.
	const previousQueryTotals = usePrevious(
		{ totalQuery, totalProducts },
		(
			{ totalQuery: nextQuery, totalProducts: nextProducts },
			{ totalQuery: currentQuery } = {}
		) =>
			! isShallowEqual( nextQuery, currentQuery ) &&
			Number.isFinite( nextProducts )
	);
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
	const totalPages =
		! Number.isFinite( totalProducts ) &&
		typeof previousQueryTotals === 'object' &&
		isShallowEqual( totalQuery, previousQueryTotals.totalQuery )
			? Math.ceil( previousQueryTotals.totalProducts / perPage )
			: Math.ceil( totalProducts / perPage );
	const listProducts = products.length
		? products
		: Array.from( { length: perPage } );

	return (
		<div className={ getClassnames() }>
			{ contentVisibility.orderBy && (
				<ProductSortSelect
					onChange={ onSortChange }
					value={ sortValue }
				/>
			) }
			<ul className={ `${ layoutStyleClassPrefix }__products` }>
				{ listProducts.map( ( product = {}, i ) => (
					<ProductListItem
						key={ product.id || i }
						attributes={ attributes }
						product={ product }
					/>
				) ) }
			</ul>
			{ totalPages > 1 && (
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
