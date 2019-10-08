/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Component } from 'react';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { PLACEHOLDER_IMG_SRC, THUMBNAIL_SIZE } from '@woocommerce/block-settings';

class ProductListImage extends Component {
	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
		showSaleBadge: PropTypes.bool,
	}

	renderSaleBadge = () => {
		const { product, showSaleBadge } = this.props;

		if ( showSaleBadge && product.onsale ) {
			return (
				<span className="wc-block-grid__product-onsale">
					{ __( 'Sale', 'woo-gutenberg-products-block' ) }
				</span>
			);
		}
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
				{ this.renderSaleBadge() }
				{ image }
			</div>
		);
	}
}

export default ProductListImage;
