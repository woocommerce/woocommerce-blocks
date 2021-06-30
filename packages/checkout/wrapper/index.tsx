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
	hasBottomBorder?: boolean;
}

const TotalsWrapper = ( {
	children,
	borderSize = 'normal',
	hasBottomBorder = false,
}: TotalsWrapperProps ): JSX.Element | null => {
	return Children.count( children ) ? (
		<div
			className={ `wc-block-components-totals-wrapper border-${ borderSize }${
				hasBottomBorder ? ' has-bottom-border' : ''
			}` }
		>
			{ children }
		</div>
	) : null;
};

export default TotalsWrapper;
