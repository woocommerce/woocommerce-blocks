/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { THUMBNAIL_SIZE } from '@woocommerce/block-settings';

const ProductLink = ( { children, className, permalink } ) => {
	const props = {
		className,
		style: {
			maxWidth: `${ THUMBNAIL_SIZE }px`,
		},
	};
	if ( ! permalink ) {
		return <div { ...props }>{ children }</div>;
	}

	return (
		<a { ...props } href={ permalink } rel="nofollow">
			{ children }
		</a>
	);
};

ProductLink.propTypes = {
	className: PropTypes.string,
	permalink: PropTypes.string,
};

export default ProductLink;
