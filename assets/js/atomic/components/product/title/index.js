/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useInnerBlockConfigurationContext } from '@woocommerce/shared-context';
import { decodeEntities } from '@wordpress/html-entities';

const ProductTitle = ( {
	className,
	product,
	headingLevel = 2,
	productLink = true,
} ) => {
	const { layoutStyleClassPrefix } = useInnerBlockConfigurationContext();
	const TagName = `h${ headingLevel }`;
	const componentClass = `${ layoutStyleClassPrefix }__product-title`;

	if ( ! product ) {
		return (
			<TagName
				className={ classnames(
					className,
					componentClass,
					'is-loading'
				) }
			/>
		);
	}

	const productName = decodeEntities( product.name );

	if ( ! productName ) {
		return null;
	}

	return (
		<TagName className={ classnames( className, componentClass ) }>
			{ productLink ? (
				<a href={ product.permalink } rel="nofollow">
					{ productName }
				</a>
			) : (
				productName
			) }
		</TagName>
	);
};

ProductTitle.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
	headingLevel: PropTypes.number,
	productLink: PropTypes.bool,
};

export default ProductTitle;
