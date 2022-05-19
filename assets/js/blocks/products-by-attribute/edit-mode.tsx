/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import { category, Icon } from '@wordpress/icons';
import ProductAttributeTermControl from '@woocommerce/editor-components/product-attribute-term-control';

/**
 * Internal dependencies
 */
import { Props } from './types';

export const ProductsByAttributeEditMode = ( props: Props ): JSX.Element => {
	const { debouncedSpeak, setAttributes } = props;
	const blockAttributes = props.attributes;
	const onDone = () => {
		setAttributes( { editMode: false } );
		debouncedSpeak(
			__(
				'Showing Products by Attribute block preview.',
				'woo-gutenberg-products-block'
			)
		);
	};

	return (
		<Placeholder
			icon={ <Icon icon={ category } /> }
			label={ __(
				'Products by Attribute',
				'woo-gutenberg-products-block'
			) }
			className="wc-block-products-grid wc-block-products-by-attribute"
		>
			{ __(
				'Display a grid of products from your selected attributes.',
				'woo-gutenberg-products-block'
			) }
			<div className="wc-block-products-by-attribute__selection">
				<ProductAttributeTermControl
					selected={ blockAttributes.attributes }
					onChange={ ( value = [] ) => {
						const result = value.map(
							( { id, attr_slug: attributeSlug } ) => ( {
								id,
								attr_slug: attributeSlug,
							} )
						);
						setAttributes( { attributes: result } );
					} }
					operator={ blockAttributes.attrOperator }
					onOperatorChange={ ( value = 'any' ) =>
						setAttributes( { attrOperator: value } )
					}
				/>
				<Button isPrimary onClick={ onDone }>
					{ __( 'Done', 'woo-gutenberg-products-block' ) }
				</Button>
			</div>
		</Placeholder>
	);
};
