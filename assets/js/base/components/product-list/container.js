/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useUrlQueryString } from '@woocommerce/base-hooks';

/**
 * Internal dependencies
 */
import ProductList from './index';

function ProductListContainer ( props ) {
	const onPageChange = ( newPage ) => {
		updateUrlAttributes( {
			product_page: newPage,
		} );
	};

	const onSortChange = ( event ) => {
		const newSortValue = event.target.value;
		updateUrlAttributes( {
			product_sort: newSortValue,
		} );
	};

	// Initialise the query string state from props.
	// eslint-disable-next-line camelcase
	const { attributes, product_page } = props;
	const [ urlAttributes, updateUrlAttributes ] = useUrlQueryString( {
		product_page,
		product_sort: attributes.orderby,
	} );

	// Use query string props for component render.
	const sortValue = urlAttributes.product_sort; // eslint-disable-line camelcase
	const currentPage = parseInt( urlAttributes.product_page );

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
