/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Component } from 'react';

class ProductListLink extends Component {
	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
	}

	render = () => {
		const { product, className, children } = this.props;
		const classes = classnames(
			className,
			'wc-block-grid__product-link',
		);

		return (
			<a
				href={ product.permalink }
				className={ classes }
				rel="nofollow"
			>
				{ children }
			</a>
		);
	}
}

export default ProductListLink;
