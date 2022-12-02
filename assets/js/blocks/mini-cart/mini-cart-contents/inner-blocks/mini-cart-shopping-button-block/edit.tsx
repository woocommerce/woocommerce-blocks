/**
 * External dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import Button from '@woocommerce/base-components/button';

/**
 * Internal dependencies
 */
import { defaultShoppingButtonLabel } from './constants';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		shoppingButtonLabel: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const blockProps = useBlockProps();
	const { shoppingButtonLabel } = attributes;

	return (
		<div { ...blockProps }>
			<div className="wp-block-button aligncenter">
				<Button className="wc-block-mini-cart__shopping-button">
					<RichText
						multiline={ false }
						allowedFormats={ [] }
						value={ shoppingButtonLabel }
						placeholder={ defaultShoppingButtonLabel }
						onChange={ ( content ) => {
							setAttributes( {
								shoppingButtonLabel: content,
							} );
						} }
					/>
				</Button>
			</div>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
