/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
	useInnerBlockLayoutContext,
	useProductDataContext,
} from '@woocommerce/shared-context';
import { isEmpty } from 'lodash';

/**
 * Internal dependencies
 */
import './style.scss';
import withProductDataContext from '../shared/with-product-data-context';

/**
 * Product Tag List Block Component.
 *
 * @param {Object} props             Incoming props.
 * @param {string} [props.className] CSS Class name for the component.
 * @return {*} The component.
 */
const Block = ( { className } ) => {
	const { parentClassName } = useInnerBlockLayoutContext();
	const { product } = useProductDataContext();

	if ( ! product || isEmpty( product.tags ) ) {
		return null;
	}

	return (
		<div
			className={ classnames(
				className,
				'wc-block-components-product-tag-list',
				`${ parentClassName }__product-tag-list`
			) }
		>
			{ __( 'Tags:', 'woo-gutenberg-products-block' ) }{ ' ' }
			<ul>
				{ Object.values( product.tags ).map(
					( { name, link, slug } ) => {
						return (
							<li key={ `tag-list-item-${ slug }` }>
								<a href={ link }>{ name }</a>
							</li>
						);
					}
				) }
			</ul>
		</div>
	);
};

Block.propTypes = {
	className: PropTypes.string,
};

export default withProductDataContext( Block );
