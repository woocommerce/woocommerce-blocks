/**
 * External dependencies
 */
import { withFilteredAttributes } from '@woocommerce/shared-hocs';

/**
 * Internal dependencies
 */
import attributes from './attributes';
import Block from './block';

const FrontendBlock = ( {
	field,
	section,
}: {
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
