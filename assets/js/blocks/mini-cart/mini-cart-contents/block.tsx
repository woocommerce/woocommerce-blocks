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
	console.log( props.attributes );
	document.documentElement.style.setProperty(
		'--drawer-width',
		`${ width }px`
	);
	// console.log(
	// 	getComputedStyle( document.documentElement ).getPropertyValue(
	// 		'--drawer-width'
	// 	)
	// );
	return <>{ children }</>;
};
