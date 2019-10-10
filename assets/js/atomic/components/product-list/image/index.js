/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { Component, Fragment } from 'react';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { PLACEHOLDER_IMG_SRC } from '@woocommerce/block-settings';

class ProductListImage extends Component {
	static propTypes = {
		className: PropTypes.string,
		product: PropTypes.object.isRequired,
		productLink: PropTypes.bool,
	};

	static defaultProps = {
		productLink: true,
	};

	state = {
		loaded: false,
	};

	onImageLoaded = () => {
		this.setState( {
			loaded: true,
		} );
	};

	renderImage = ( image ) => {
		const { loaded } = this.state;
		return (
			<Fragment>
				{ image && (
					<img
						className="wc-block-grid__product-image__image"
						src={ image.thumbnail }
						srcSet={ image.srcset }
						sizes={ image.sizes }
						alt={ image.alt }
						onLoad={ this.onImageLoaded }
						hidden={ ! loaded }
					/>
				) }
				{ ! loaded && (
					<img
						className="wc-block-grid__product-image__image wc-block-grid__product-image__image_placeholder"
						src={ PLACEHOLDER_IMG_SRC }
						alt=""
					/>
				) }
			</Fragment>
		);
	};

	render() {
		const { className, product, productLink } = this.props;
		const image =
			product.images && product.images.length ? product.images[ 0 ] : {};

		return (
			<div
				className={ classnames(
					className,
					'wc-block-grid__product-image'
				) }
			>
				{ !! productLink ? (
					<a href={ product.permalink } rel="nofollow">
						{ this.renderImage( image ) }
					</a>
				) : (
					this.renderImage( image )
				) }
			</div>
		);
	}
}

export default ProductListImage;
