/**
 * External dependencies
 */
import { ValidatedTextInput } from '@woocommerce/blocks-checkout';

const Block = ( { section, field }: { section: string } ) => {
	const fieldLabel = field.label + ( field.required ? '*' : '' );
	return (
		<div>
			<ValidatedTextInput
				key={ field.name }
				id={ `wc-block-components-address-form__${ section }-custom-${ field.name }` }
				className={ `wc-block-components-address-form__${ field.name }` }
				label={ fieldLabel }
				value=""
				onChange={ () => null }
				showError={ false }
				required={ field.required }
				readOnly={ true }
			/>
		</div>
	);
};

export default Block;
