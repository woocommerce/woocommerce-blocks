/**
 * External dependencies
 */
import { ValidatedTextInput } from '@woocommerce/blocks-checkout';

const Block = ( {
	section,
	field,
	value = '',
	readOnly = false, // There's probably a better way to know whether we're editing or not.
}: {
	section: string;
	value: string;
	readOnly: boolean;
} ) => {
	const fieldLabel = field.label + ( field.required ? '*' : '' );
	return (
		<div>
			<ValidatedTextInput
				key={ field.name }
				id={ `${ section }-${ field.name }` }
				className={ `wc-block-components-address-form__${ field.name }` }
				label={ fieldLabel }
				value={ value }
				onChange={ () => null }
				showError={ false }
				required={ field.required }
				readOnly={ readOnly }
			/>
		</div>
	);
};

export default Block;
