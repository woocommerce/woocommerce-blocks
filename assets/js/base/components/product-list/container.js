/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import ProductList from './index';

const ProductListContainer = ( {
	attributes,
	// eslint-disable-next-line camelcase
	product_page = 1,
	// eslint-disable-next-line camelcase
	product_sort,
} ) => {
	const [ currentPage, setPage ] = useState( product_page );
	const [ currentSort, setSort ] = useState(
		// eslint-disable-next-line camelcase
		product_sort || attributes.orderby
	);
	const onPageChange = ( newPage ) => {
		setPage( newPage );
	};
	const onSortChange = ( event ) => {
		const newSortValue = event.target.value;
		setSort( newSortValue );
		setPage( 1 );
	};

	return (
		<ProductList
			attributes={ attributes }
			currentPage={ currentPage }
			onPageChange={ onPageChange }
			onSortChange={ onSortChange }
			sortValue={ currentSort }
		/>
	);
};

ProductListContainer.propTypes = {
	attributes: PropTypes.object.isRequired,
	// From withQueryStringValues
	product_page: PropTypes.oneOfType( [ PropTypes.number, PropTypes.string ] ),
	product_sort: PropTypes.string,
};

ProductListContainer.defaultProps = {
	product_page: 1,
};

export default ProductListContainer;
