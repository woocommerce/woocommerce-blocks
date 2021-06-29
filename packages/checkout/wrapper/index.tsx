/**
 * External dependencies
 */
import { Children, ReactNode } from 'react';

/**
 * Internal dependencies
 */
import './style.scss';

interface TotalsWrapperProps {
	children: ReactNode;
	borderSize?: 'small' | 'normal' | 'large';
}

const TotalsWrapper = ( {
	children,
	borderSize = 'normal',
}: TotalsWrapperProps ): JSX.Element | null => {
	return Children.count( children ) ? (
		<div
			className={ `wc-block-components-totals-wrapper border-${ borderSize }` }
		>
			{ children }
		</div>
	) : null;
};

export default TotalsWrapper;
