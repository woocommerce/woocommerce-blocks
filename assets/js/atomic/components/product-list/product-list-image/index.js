/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import {
	PLACEHOLDER_IMG_SRC,
	THUMBNAIL_SIZE,
} from '@woocommerce/block-settings';

const ProductListImage = ( {
	className,
	product,
	showSaleBadge,
	productLink,
} ) => {
	const renderSaleBadge = () => {
		if ( showSaleBadge && product.onsale ) {
			return (
				<span className="wc-block-grid__product-onsale">
					{ __( 'Sale', 'woo-gutenberg-products-block' ) }
				</span>
			);
		}
	};

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
				style={ {
					width: `${ THUMBNAIL_SIZE }px` /* stylelint-disable-line */,
				} }
			/>
		);
	} else {
		image = (
			<img
				className="wc-block-grid__product-image__image wc-block-grid__product-image__image_placeholder"
				src={ PLACEHOLDER_IMG_SRC }
				alt=""
				style={ {
					width: `${ THUMBNAIL_SIZE }px` /* stylelint-disable-line */,
				} }
			/>
		);
	}

	return (
		<div
			className={ classnames(
				className,
				'wc-block-grid__product-image'
			) }
		>
			{ renderSaleBadge() }
			{ !! productLink ? (
				<a href={ product.permalink } rel="nofollow">
					{ image }
				</a>
			) : (
				<Fragment>{ image }</Fragment>
			) }
		</div>
	);
};

ProductListImage.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
	showSaleBadge: PropTypes.bool,
	productLink: PropTypes.bool,
};

ProductListImage.defaultProps = {
	showSaleBadge: true,
	productLink: true,
};

export default ProductListImage;
