/**
 * External dependencies
 */
import { withFilteredAttributes } from '@woocommerce/shared-hocs';

/**
 * Internal dependencies
 */
import attributes from './attributes';

const FrontendBlock = (): JSX.Element | null => {
	return <div>Hey frontend</div>;
};

export default withFilteredAttributes( attributes )( FrontendBlock );
