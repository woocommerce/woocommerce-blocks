/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import './admin.scss';

const SettingsSection = ( {
	Description = () => null,
	children,
	...props
}: {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	Description: () => JSX.Element | null;
	children: React.ReactNode;
} ): JSX.Element => (
	<div className="wc-blocks-settings-section-wrapper" { ...props }>
		<div className="wc-blocks-settings-description-wrapper">
			<Description />
		</div>
		<div className="wc-blocks-settings-section-controls">{ children }</div>
	</div>
);

export default SettingsSection;
