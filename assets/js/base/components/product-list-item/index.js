/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useInnerBlockLayoutContext } from '@woocommerce/shared-context';
import { withInstanceId } from '@woocommerce/base-hocs/with-instance-id';
import { Suspense } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { renderProductLayout } from './utils';

const ProductListItem = ( { product, attributes, instanceId } ) => {
	const { layoutConfig } = attributes;
	const { parentClassName, parentName } = useInnerBlockLayoutContext();
	const isLoading = Object.keys( product ).length === 0;
	const classes = classnames( `${ parentClassName }__product`, {
		'is-loading': isLoading,
		'wc-block-layout--is-loading': isLoading, // This can be removed when switching to inner block rendering.
	} );

	return (
		<li className={ classes } aria-hidden={ isLoading }>
			<Suspense fallback={ null }>
				{ renderProductLayout(
					parentName,
					product,
					layoutConfig,
					instanceId
				) }
			</Suspense>
		</li>
	);
};

ProductListItem.propTypes = {
	attributes: PropTypes.object.isRequired,
	product: PropTypes.object,
	// from withInstanceId
	instanceId: PropTypes.number.isRequired,
};

export default withInstanceId( ProductListItem );
