/**
 * External dependencies
 */
import classnames from 'classnames';
import { useStyleProps } from '@woocommerce/base-hooks';
import { isString } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import Block from './block';
import { parseAttributes } from './utils';

const BlockWrapper = ( props: Record< string, unknown > ) => {
	const styleProps = useStyleProps( props );

	return (
		<div
			className={ classnames(
				isString( props.className ) ? props.className : '',
				styleProps.className
			) }
			style={ { ...styleProps.style } }
		>
			<Block isEditor={ false } attributes={ parseAttributes( props ) } />
		</div>
	);
};

export default BlockWrapper;
