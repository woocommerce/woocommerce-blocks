/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Component } from 'react';

class ProductListTitle extends Component {
	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
	}

	render = () => {
		const { product, className } = this.props;

		if ( ! product.name ) {
			return null;
		}

		const classes = classnames(
			className,
			'wc-block-grid__product-title',
		);

		return (
			<div className={ classes }>
				{ product.name }
			</div>
		);
	}
}

export default ProductListTitle;
