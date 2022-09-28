/**
 * Internal dependencies
 */
import Block from './block';
import { parseAttributes } from './utils';

const BlockWrapper = ( props: Record< string, unknown > ) => {
	return <Block isEditor={ false } attributes={ parseAttributes( props ) } />;
};

export default BlockWrapper;
