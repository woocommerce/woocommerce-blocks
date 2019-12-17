/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

const TotalsItem = ( { className, label, value, description } ) => {
	return (
		<div
			className={ classnames( 'wc-block-totals-table-item', className ) }
		>
			<span className="wc-block-totals-table-item__label">{ label }</span>
			<span className="wc-block-totals-table-item__value">{ value }</span>
			<span className="wc-block-totals-table-item__description">
				{ description }
			</span>
		</div>
	);
};

TotalsItem.propTypes = {
	label: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	className: PropTypes.string,
	description: PropTypes.node,
};

export default TotalsItem;
