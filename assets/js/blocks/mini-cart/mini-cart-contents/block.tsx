/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import './inner-blocks/register-components';

type MiniCartContentsBlockProps = {
	attributes: Record< string, unknown >;
	children: JSX.Element | JSX.Element[];
};

export const MiniCartContentsBlock = (
	props: MiniCartContentsBlockProps
): JSX.Element => {
	const {
		children,
		attributes: { width },
	} = props;
	document.documentElement.style.setProperty( '--drawer-width', width );
	// console.log(
	// 	getComputedStyle( document.documentElement ).getPropertyValue(
	// 		'--drawer-width'
	// 	)
	// );
	return <>{ children }</>;
};
