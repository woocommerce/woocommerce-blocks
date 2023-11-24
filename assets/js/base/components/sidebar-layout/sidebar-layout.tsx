/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { ContainerWidthContextProvider } from '~/base/context';
import './style.scss';
interface SidebarLayoutProps {
	children: JSX.Element | JSX.Element[];
	className: string;
}

const SidebarLayout = ( {
	children,
	className,
}: SidebarLayoutProps ): JSX.Element => {
	return (
		<ContainerWidthContextProvider
			className={ classNames(
				'wc-block-components-sidebar-layout',
				className
			) }
		>
			{ children }
		</ContainerWidthContextProvider>
	);
};

export default SidebarLayout;
