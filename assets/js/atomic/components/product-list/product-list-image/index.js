/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Component } from 'react';

/**
 * Internal dependencies
 */
import { PLACEHOLDER_IMG_SRC, THUMBNAIL_SIZE } from '../../../../constants';

class ProductListImage extends Component {
	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
	}

	render = () => {
		const { product, className } = this.props;
		let image = null;

		const classes = classnames(
			className,
			'wc-block-grid__product-image',
		);

		if ( product.images.length ) {
			const mainImage = product.images[ 0 ];
			image = (
				<img
					src={ mainImage.thumbnail }
					srcSet={ mainImage.srcset }
					sizes={ mainImage.sizes }
					alt={ mainImage.alt }
					style={ { width: `${ THUMBNAIL_SIZE }px` } }
				/>
			);
		} else {
			image = (
				<img
					src={ PLACEHOLDER_IMG_SRC }
					alt=""
					style={ { width: `${ THUMBNAIL_SIZE }px` } }
				/>
			);
		}

		return (
			<div className={ classes }>
				{ image }
			</div>
		);
	}
}

export default ProductListImage;
