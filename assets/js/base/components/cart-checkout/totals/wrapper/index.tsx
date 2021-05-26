/**
 * External dependencies
 */
import type { ReactNode } from 'react';

/**
 * Internal dependencies
 */
import './style.scss';

interface TotalsWrapperProps {
	children: ReactNode[];
}

const TotalsWrapper = ( { children }: TotalsWrapperProps ): JSX.Element => {
	return (
		<div className="wc-block-components-totals-wrapper">{ children }</div>
	);
};

export default TotalsWrapper;
