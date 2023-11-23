/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { Sidebar } from '~/base/components/sidebar-layout';
import './style.scss';

const FrontendBlock = ( {
	children,
	className = '',
}: {
	children: JSX.Element | JSX.Element[];
	className?: string;
} ): JSX.Element => {
	return (
		<Sidebar
			className={ classnames( 'wc-block-cart__sidebar', className ) }
		>
			{ children }
		</Sidebar>
	);
};

export default FrontendBlock;
