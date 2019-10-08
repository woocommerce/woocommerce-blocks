/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Component } from 'react';
import classnames from 'classnames';

class ProductListTitle extends Component {
	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
	};

	render = () => {
		const { product, className } = this.props;

		if ( ! product.name ) {
			return null;
		}

		return (
			<div
				className={ classnames(
					className,
					'wc-block-grid__product-title'
				) }
			>
				{ product.name }
			</div>
		);
	};
}

export default ProductListTitle;
