/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Pagination from '../pagination';
import ProductSortSelect from '../product-sort-select';
import ProductGridItem from '../product-grid-item';
import withProducts from '../../hocs/with-products';
import './style.scss';

const ProductGrid = ( {
	attributes,
	currentPage,
	onSortChange,
	onPageChange,
	sortValue,
	products,
	totalProducts,
} ) => {
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

	const perPage = attributes.columns * attributes.rows;
	const totalPages = Math.ceil( totalProducts / perPage );
	if ( ! products.length ) {
		products = Array.from( { length: perPage } );
	}

	return (
		<div className={ getClassnames() }>
			{ attributes.showOrderby && (
				<ProductSortSelect
					onChange={ onSortChange }
					value={ sortValue }
				/>
			) }
			<ul className="wc-block-grid__products">
				{ products.map( ( product = {}, i ) => (
					<ProductGridItem
						key={ product.id || i }
						attributes={ attributes }
						product={ product }
					/>
				) ) }
			</ul>
			{ totalProducts > perPage && (
				<Pagination
					currentPage={ currentPage }
					onPageChange={ onPageChange }
					totalPages={ totalPages }
				/>
			) }
		</div>
	);
};

ProductGrid.propTypes = {
	attributes: PropTypes.object.isRequired,
	// From withProducts.
	products: PropTypes.array,
};

export default withProducts( ProductGrid );
