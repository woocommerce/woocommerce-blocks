/**
 * External dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import Button from '@woocommerce/base-components/button';

/**
 * Internal dependencies
 */
import { defaultCartButtonLabel } from './constants';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		cartButtonLabel: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const blockProps = useBlockProps();
	const { cartButtonLabel } = attributes;

	return (
		<div className="wp-block-button aligncenter">
			<Button
				{ ...blockProps }
				className="wc-block-mini-cart__shopping-button"
				variant="outlined"
			>
				<RichText
					multiline={ false }
					allowedFormats={ [] }
					value={ cartButtonLabel }
					placeholder={ defaultCartButtonLabel }
					onChange={ ( content ) => {
						setAttributes( {
							cartButtonLabel: content,
						} );
					} }
				/>
			</Button>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
