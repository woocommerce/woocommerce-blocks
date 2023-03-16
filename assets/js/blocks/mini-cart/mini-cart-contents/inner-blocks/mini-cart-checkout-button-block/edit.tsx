/**
 * External dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';
import Button from '@woocommerce/base-components/button';

/**
 * Internal dependencies
 */
import { defaultCheckoutButtonLabel } from './constants';

export const Edit = ( {
	attributes,
	setAttributes,
}: {
	attributes: {
		checkoutButtonLabel: string;
	};
	setAttributes: ( attributes: Record< string, unknown > ) => void;
} ): JSX.Element => {
	const blockProps = useBlockProps();
	const { checkoutButtonLabel } = attributes;

	return (
		<Button { ...blockProps } className="checkout">
			<RichText
				multiline={ false }
				allowedFormats={ [] }
				value={ checkoutButtonLabel }
				placeholder={ defaultCheckoutButtonLabel }
				onChange={ ( content ) => {
					setAttributes( {
						checkoutButtonLabel: content,
					} );
				} }
			/>
		</Button>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
