/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Component } from 'react';
import classnames from 'classnames';

class ProductListLink extends Component {
	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
	};

	render = () => {
		const { product, className, children } = this.props;

		return (
			<a
				href={ product.permalink }
				className={ classnames(
					className,
					'wc-block-grid__product-link'
				) }
				rel="nofollow"
			>
				{ children }
			</a>
		);
	};
}

export default ProductListLink;
