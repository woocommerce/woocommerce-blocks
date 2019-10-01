/**
 * External dependencies
 */
import { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { PLACEHOLDER_IMG_SRC } from '@woocommerce/block-settings';


class ProductImage extends Component {
	state = {
		loaded: false,
	}

	onImageLoaded = () => {
		this.setState( {
			loaded: true,
		} );
	}

	render() {
		const { className, image } = this.props;
		const { loaded } = this.state;

		return (
			<div
				className={ className }
			>
				{ image && (
					<img
						className={ className + '__image' }
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
						className={ `${ className }__image ${ className }__image_placeholder` }
						src={ PLACEHOLDER_IMG_SRC }
						alt=""
					/>
				) }
			</div>
		);
	}
};

ProductImage.propTypes = {
	className: PropTypes.string.isRequired,
	image: PropTypes.object,
};

export default ProductImage;
