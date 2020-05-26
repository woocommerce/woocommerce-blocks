/**
 * External dependencies
 */
import { getValidBlockAttributes } from '@woocommerce/base-utils';

/**
 * Internal dependencies
 */
import Block from './block';
import BlockAttributes from './attributes';

/**
 * Wrapper component used on the frontend.
 */
const FrontendBlock = ( { attributes } ) => {
	const parsedAttributes = getValidBlockAttributes(
		BlockAttributes,
		attributes
	);
	return <Block { ...parsedAttributes } />;
};

export default FrontendBlock;
