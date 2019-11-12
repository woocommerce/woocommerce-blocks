/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Component displaying active filters.
 */
const ActiveFiltersBlock = ( { attributes } ) => {
	const { displayStyle } = attributes;
	return <div className="wc-block-active-filters">{ displayStyle }</div>;
};

export default ActiveFiltersBlock;
