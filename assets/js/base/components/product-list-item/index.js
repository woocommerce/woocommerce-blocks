/**
 * External dependencies.
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies.
 */
import { useBlockNameContext } from '../../utils/block-name-context';
import withComponentId from '@woocommerce/base-hocs/with-component-id';
import { renderProductLayout } from './utils';

const ProductListItem = ( { product, attributes, componentId } ) => {
	const { layoutConfig } = attributes;
	const blockName = useBlockNameContext();
	const isLoading = ! Object.keys( product ).length > 0;
	const classes = classnames( 'wc-block-grid__product', {
		'is-loading': isLoading,
	} );

	return (
		<li className={ classes } aria-hidden={ isLoading }>
			{ renderProductLayout(
				blockName,
				product,
				layoutConfig,
				componentId
			) }
		</li>
	);
};

ProductListItem.propTypes = {
	attributes: PropTypes.object.isRequired,
	product: PropTypes.object,
	// from withComponentId
	componentId: PropTypes.number.isRequired,
};

export default withComponentId( ProductListItem );
