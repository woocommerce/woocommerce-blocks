/**
 * External dependencies
 */
import { ValidatedTextInput } from '@woocommerce/blocks-checkout';

const Block = ( { section, field } ) => {
	const fieldLabel = field.label + ( field.required ? '' : '*' );
	return (
		<div>
			<ValidatedTextInput
				key={ field.key }
				id={ `${ section }-${ field.key }` }
				className={ `wc-block-components-address-form__${ field.key }` }
				label={ fieldLabel }
				value=""
				onChange={ () => null }
				showError={ false }
				errorMessage={ field.errorMessage }
				required={ field.required }
				readOnly={ true }
			/>
		</div>
	);
};

export default Block;
