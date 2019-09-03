/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import ProductGridItem from './product-grid-item';
import './style.scss';

const ProductGrid = ( { attributes, componentId, products } ) => {
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

	return (
		<div className={ getClassnames() }>
			<ul
				key={ `wc-block-grid__products-${ componentId }` }
				className="wc-block-grid__products"
			>
				{ products.length === 0 ?
					(
						<ProductGridItem attributes={ attributes } />
					) : (
						products.map( ( product, i ) => (
							<ProductGridItem key={ product.id || i } attributes={ attributes } product={ product } />
						) )
					)
				}
			</ul>
		</div>
	);
};

ProductGrid.propTypes = {
	attributes: PropTypes.object.isRequired,
	componentId: PropTypes.number.isRequired,
	products: PropTypes.array.isRequired,
};

export default ProductGrid;
