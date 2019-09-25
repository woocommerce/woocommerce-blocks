/**
 * External dependencies
 */
import PropTypes from 'prop-types';

const ProductTitle = ( { className, name } ) => {
	return <div className={ className }>{ name }</div>;
};

ProductTitle.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string,
};

export default ProductTitle;
