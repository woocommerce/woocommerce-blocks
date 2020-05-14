/**
 * External dependencies
 */
import classnames from 'classnames';
import { useProductLayoutContext } from '@woocommerce/base-context';
import { decodeEntities } from '@wordpress/html-entities';
import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const ProductVariationAttributePicker = ( { className, product } ) => {
	const { layoutStyleClassPrefix } = useProductLayoutContext();
	const attributes = product.attributes || {};

	if ( ! attributes ) {
		return null;
	}

	return (
		<div
			className={ classnames(
				className,
				`${ layoutStyleClassPrefix }__product-variation-attribute-picker`
			) }
		>
			{ Object.values( attributes ).map(
				( { name, has_variations: hasVariations, terms }, index ) => {
					if ( ! hasVariations ) {
						return null;
					}
					const options = Object.values( terms ).map( ( term ) => ( {
						label: term.name,
						value: term.id ? term.id : term.name,
					} ) );
					return (
						<SelectControl
							key={ index }
							label={ decodeEntities( name ) }
							value={ null }
							options={ [
								{
									value: null,
									label: __(
										'Select an option',
										'woo-gutenberg-products-block'
									),
								},
								...options,
							] }
						/>
					);
				}
			) }
		</div>
	);
};

export default ProductVariationAttributePicker;
