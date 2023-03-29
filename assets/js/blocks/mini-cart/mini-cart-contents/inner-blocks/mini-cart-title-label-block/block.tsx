/**
 * External dependencies
 */
import { useColorProps, useTypographyProps } from '@woocommerce/base-hooks';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { defaultYourCartLabel } from './constants';

type Props = {
	label?: string;
	className?: string;
};

const Block = ( props: Props ): JSX.Element => {
	const colorProps = useColorProps( props );
	const typographyProps = useTypographyProps( props );

	return (
		<h2
			className={ classNames(
				props.className,
				colorProps.className,
				typographyProps.className
			) }
			style={ {
				...colorProps.style,
				...typographyProps.style,
			} }
		>
			{ props.label || defaultYourCartLabel }
		</h2>
	);
};

export default Block;
