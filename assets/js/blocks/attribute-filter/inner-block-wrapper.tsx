/**
 * Internal dependencies
 */
import Block from './block';
import { parseAttributes } from './utils';

const InnerBlockWrapper = ( props: Record< string, unknown > ) => {
	return <Block isEditor={ false } attributes={ parseAttributes( props ) } />;
};

export default InnerBlockWrapper;
