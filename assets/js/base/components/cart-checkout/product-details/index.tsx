/**
 * External dependencies
 */
import { kebabCase } from 'lodash';
import { decodeEntities } from '@wordpress/html-entities';
import type { ProductResponseItemData } from '@woocommerce/type-defs/product-response';

/**
 * Internal dependencies
 */
import './style.scss';

interface ProductDetailsProps {
	details: ProductResponseItemData[];
}
// Component to display cart item data and variations.
const ProductDetails = ( {
	details = [],
}: ProductDetailsProps ): JSX.Element | null => {
	if ( ! Array.isArray( details ) ) {
		return null;
	}

	details = details.filter( ( detail ) => ! detail.hidden );

	if ( details.length === 0 ) {
		return null;
	}

	return (
		<ul className="wc-block-components-product-details">
			{ details.map( ( detail ) => {
				const name = detail?.name || '';
				const className = detail.key
					? `wc-block-components-product-details__${ kebabCase(
							detail.key
					  ) }`
					: '';
				return (
					<li
						key={ name + ( detail.display || detail.value ) }
						className={ className }
					>
						{ name && (
							<>
								<span className="wc-block-components-product-details__name">
									{ decodeEntities( name ) }:
								</span>{ ' ' }
							</>
						) }
						<span className="wc-block-components-product-details__value">
							{ decodeEntities( detail.display || detail.value ) }
						</span>
					</li>
				);
			} ) }
		</ul>
	);
};

export default ProductDetails;
