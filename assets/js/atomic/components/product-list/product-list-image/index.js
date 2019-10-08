/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Component } from 'react';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import {
	PLACEHOLDER_IMG_SRC,
	THUMBNAIL_SIZE,
} from '@woocommerce/block-settings';

class ProductListImage extends Component {
	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
		showSaleBadge: PropTypes.bool,
	};

	renderSaleBadge = () => {
		const { product, showSaleBadge } = this.props;

		if ( showSaleBadge && product.onsale ) {
			return (
				<span className="wc-block-grid__product-onsale">
					{ __( 'Sale', 'woo-gutenberg-products-block' ) }
				</span>
			);
		}
	};

	render = () => {
		const { product, className } = this.props;
		let image = null;

		if ( product.images && product.images.length ) {
			const mainImage = product.images[ 0 ];
			image = (
				<img
					className="wc-block-grid__product-image__image"
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
					className="wc-block-grid__product-image__image wc-block-grid__product-image__image_placeholder"
					src={ PLACEHOLDER_IMG_SRC }
					alt=""
					style={ { width: `${ THUMBNAIL_SIZE }px` } }
				/>
			);
		}

		return (
			<div className={ classnames( className, 'wc-block-grid__product-image' ) }>
				{ this.renderSaleBadge() }
				{ image }
			</div>
		);
	};
}

export default ProductListImage;
