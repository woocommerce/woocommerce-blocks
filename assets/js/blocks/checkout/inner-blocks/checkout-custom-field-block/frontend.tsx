/**
 * External dependencies
 */
import { withFilteredAttributes } from '@woocommerce/shared-hocs';

/**
 * Internal dependencies
 */
import attributes from './attributes';
import Block from './block';

interface FieldProps {
	name: string;
	label: string;
	required: boolean;
	type: string;
	size?: string | undefined;
}

const FrontendBlock = ( {
	field,
	section,
}: {
	field: FieldProps;
	section: string;
} ): JSX.Element | null => {
	return (
		<Block
			field={ field }
			section={ section }
			value={ 'Test value for now' }
			readOnly={ false }
		/>
	);
};

export default withFilteredAttributes( attributes )( FrontendBlock );
