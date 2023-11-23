/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { Main } from '~/base/components/sidebar-layout';

const FrontendBlock = ( {
	children,
	className,
}: {
	children: JSX.Element;
	className: string;
} ): JSX.Element => {
	return (
		<Main className={ classnames( 'wc-block-cart__main', className ) }>
			{ children }
		</Main>
	);
};

export default FrontendBlock;
