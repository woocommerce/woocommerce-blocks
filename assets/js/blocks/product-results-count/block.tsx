/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

interface Props {
	attributes: {
		className?: string;
	};
}

const ProductResultsCount = ( { attributes }: Props ): JSX.Element => {
	const { className } = attributes;

	return (
		<div
			className={ classNames(
				'.wc-block-product-results-count',
				className
			) }
		>
			{ __( 'Showing 1-X of X results', 'woo-gutenberg-products-block' ) }
		</div>
	);
};

export default ProductResultsCount;
