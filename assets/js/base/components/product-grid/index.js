/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import Pagination from '../pagination';
import ProductOrderSelect from '../product-order-select';
import ProductGridItem from '../product-grid-item';
import withProducts from '../../hocs/with-products';
import './style.scss';

const ProductGrid = ( {
	attributes,
	currentPage,
	onOrderChange,
	onPageChange,
	orderValue,
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

	const totalPages = Math.ceil(
		totalProducts / ( attributes.columns * attributes.rows )
	);

	return (
		<div className={ getClassnames() }>
			{ attributes.showOrderby && (
				<ProductOrderSelect
					onChange={ onOrderChange }
					value={ orderValue }
				/>
			) }
			<ul className="wc-block-grid__products">
				{ products.length === 0 ? (
					<ProductGridItem attributes={ attributes } />
				) : (
					products.map( ( product, i ) => (
						<ProductGridItem
							key={ product.id || i }
							attributes={ attributes }
							product={ product }
						/>
					) )
				) }
			</ul>
			<Pagination
				currentPage={ currentPage }
				onPageChange={ onPageChange }
				totalPages={ totalPages }
			/>
		</div>
	);
};

ProductGrid.propTypes = {
	attributes: PropTypes.object.isRequired,
	// From withProducts.
	products: PropTypes.array,
};

export default withProducts( ProductGrid );
