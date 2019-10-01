/**
 * External dependencies
 */
import { Component, createRef } from 'react';
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

class ProductGrid extends Component {
	constructor() {
		super();

		this.scrollPointRef = createRef();
	}

	onPaginationChange = ( newPage ) => {
		const { onPageChange } = this.props;

		const srollPointRefYPosition = this.scrollPointRef.current.getBoundingClientRect()
			.bottom;
		const isScrollPointRefVisible =
			srollPointRefYPosition >= 0 &&
			srollPointRefYPosition <= window.innerHeight;
		if ( ! isScrollPointRefVisible ) {
			this.scrollPointRef.current.scrollIntoView();
		}

		onPageChange( newPage );
	};

	render() {
		const {
			attributes,
			currentPage,
			onOrderChange,
			orderValue,
			products,
			totalProducts,
		} = this.props;

		const getClassnames = () => {
			const {
				columns,
				rows,
				className,
				alignButtons,
				align,
			} = attributes;
			const alignClass =
				typeof align !== 'undefined' ? 'align' + align : '';

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
		const gridProducts = products.length
			? products
			: Array.from( { length: perPage } );

		return (
			<div className={ getClassnames() }>
				<div
					className="wc-block-grid__products__scroll-point"
					ref={ this.scrollPointRef }
					aria-hidden
				/>
				{ attributes.showOrderby && (
					<ProductOrderSelect
						onChange={ onOrderChange }
						value={ orderValue }
					/>
				) }
				<ul className="wc-block-grid__products">
					{ gridProducts.map( ( product = {}, i ) => (
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
						onPageChange={ this.onPaginationChange }
						totalPages={ totalPages }
					/>
				) }
			</div>
		);
	}
}

ProductGrid.propTypes = {
	attributes: PropTypes.object.isRequired,
	// From withProducts.
	products: PropTypes.array,
};

export default withProducts( ProductGrid );
