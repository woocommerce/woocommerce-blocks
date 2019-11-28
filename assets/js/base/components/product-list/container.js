/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useUrlQueryString } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import ProductList from './index';

function ProductListContainer( props ) {
	// Initialise the query string state from props.
	const { attributes } = props;
	const [ urlState, updateUrlHistory ] = useUrlQueryString( [
		'product_page',
		'product_sort',
	] );
	const onPageChange = ( newPage ) => {
		updateUrlHistory( {
			product_page: newPage,
		} );
	};

	const onSortChange = ( event ) => {
		const newSortValue = event.target.value;
		updateUrlHistory( {
			product_sort: newSortValue,
		} );
	};

	// Use query string props for component render.
	const sortValue = urlState.product_sort;
	const currentPage = parseInt( urlState.product_page );

	return (
		<ProductList
			attributes={ attributes }
			currentPage={ currentPage }
			onPageChange={ onPageChange }
			onSortChange={ onSortChange }
			sortValue={ sortValue }
		/>
	);
}

ProductListContainer.propTypes = {
	attributes: PropTypes.object.isRequired,
};

ProductListContainer.defaultProps = {
	product_page: 1,
};

export default ProductListContainer;
