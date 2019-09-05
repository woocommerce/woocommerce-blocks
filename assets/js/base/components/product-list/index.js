/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import ProductListItem from '../product-list-item';
import './style.scss';

const ProductList = ( { attributes, componentId, products, layoutConfig } ) => {
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
						<ProductListItem attributes={ attributes } />
					) : (
						products.map( ( product, i ) => (
							<ProductListItem layoutConfig={ layoutConfig } key={ componentId + '_' + ( product.id || i ) } attributes={ attributes } product={ product } />
						) )
					)
				}
			</ul>
		</div>
	);
};

ProductList.propTypes = {
	attributes: PropTypes.object.isRequired,
	componentId: PropTypes.number.isRequired,
	products: PropTypes.array.isRequired,
};

export default ProductList;
