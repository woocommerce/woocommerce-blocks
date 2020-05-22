/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { useState } from '@wordpress/element';
import classnames from 'classnames';
import { PLACEHOLDER_IMG_SRC } from '@woocommerce/block-settings';
import {
	useInnerBlockConfigurationContext,
	useProductDataContextContext,
} from '@woocommerce/shared-context';

/**
 * Internal dependencies
 */
import { ProductSaleBadge } from '../../../components/product';

const ProductImage = ( {
	className,
	productLink = true,
	showSaleBadge = true,
	saleBadgeAlign = 'right',
} ) => {
	const { product } = useProductDataContextContext();
	const { layoutStyleClassPrefix } = useInnerBlockConfigurationContext();
	const componentClass = `${ layoutStyleClassPrefix }__product-image`;
	const [ imageLoaded, setImageLoaded ] = useState( false );

	if ( ! product ) {
		return (
			<div
				className={ classnames(
					className,
					componentClass,
					'is-loading'
				) }
			>
				<ImagePlaceholder componentClass={ componentClass } />
			</div>
		);
	}

	const image =
		product?.images && product.images.length ? product.images[ 0 ] : null;

	return (
		<div className={ classnames( className, componentClass ) }>
			{ productLink ? (
				<a href={ product.permalink } rel="nofollow">
					{ showSaleBadge && (
						<ProductSaleBadge
							product={ product }
							align={ saleBadgeAlign }
						/>
					) }
					<Image
						componentClass={ componentClass }
						image={ image }
						onLoad={ () => setImageLoaded( true ) }
						loaded={ imageLoaded }
					/>
				</a>
			) : (
				<>
					{ showSaleBadge && (
						<ProductSaleBadge
							product={ product }
							align={ saleBadgeAlign }
						/>
					) }
					<Image
						componentClass={ componentClass }
						image={ image }
						onLoad={ () => setImageLoaded( true ) }
						loaded={ imageLoaded }
					/>
				</>
			) }
		</div>
	);
};

const ImagePlaceholder = ( { componentClass } ) => {
	return (
		<img
			className={ classnames(
				`${ componentClass }__image`,
				`${ componentClass }__image_placeholder`
			) }
			src={ PLACEHOLDER_IMG_SRC }
			alt=""
		/>
	);
};

const Image = ( { componentClass, image, onLoad, loaded } ) => {
	const { thumbnail, srcset, sizes, alt } = image || {};

	return (
		<>
			<img
				className={ classnames( `${ componentClass }__image` ) }
				src={ thumbnail }
				srcSet={ srcset }
				sizes={ sizes }
				alt={ alt }
				onLoad={ onLoad }
				hidden={ ! loaded }
			/>
			{ ! loaded && (
				<ImagePlaceholder componentClass={ componentClass } />
			) }
		</>
	);
};

ProductImage.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
	productLink: PropTypes.bool,
	showSaleBadge: PropTypes.bool,
	saleBadgeAlign: PropTypes.string,
};

export default ProductImage;
