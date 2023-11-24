/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { useStyleProps } from '~/base/hooks';
import { defaultYourCartLabel } from './constants';

type Props = {
	label?: string;
	className?: string;
};

const Block = ( props: Props ): JSX.Element => {
	const styleProps = useStyleProps( props );

	return (
		<span
			className={ classnames( props.className, styleProps.className ) }
			style={ styleProps.style }
		>
			{ props.label || defaultYourCartLabel }
		</span>
	);
};

export default Block;
