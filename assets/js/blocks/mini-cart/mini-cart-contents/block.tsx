/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import './inner-blocks/register-components';
import './style.scss';

type MiniCartContentsBlockProps = {
	children: JSX.Element | JSX.Element[];
};

export const MiniCartContentsBlock = ( {
	children,
}: MiniCartContentsBlockProps ): JSX.Element => {
	return <>{ children }</>;
};
