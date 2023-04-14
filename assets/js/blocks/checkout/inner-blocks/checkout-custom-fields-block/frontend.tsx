/**
 * External dependencies
 */
import { withFilteredAttributes } from '@woocommerce/shared-hocs';

/**
 * Internal dependencies
 */
import attributes from './attributes';

/**
 * Internal dependencies
 */
import Frontend from '../checkout-custom-field-block/frontend';

const templateField = {
	name: 'the_default_field_name',
	label: 'The default field',
	size: '',
	required: false,
};

const storedFields = [ templateField, templateField ];

const FrontendBlock = ( { section }: { section: string } ): JSX.Element => {
	return (
		<div className="wc-block-checkout__custom_fields">
			{ `Custom Fields Block Section` }
			{ storedFields.map( ( field, index ) => (
				<Frontend key={ index } field={ field } section={ section } />
			) ) }
		</div>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
