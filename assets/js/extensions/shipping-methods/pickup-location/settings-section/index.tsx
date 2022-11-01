/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import './admin.scss';

type SettingsSectionProps = {
	// eslint-disable-next-line @typescript-eslint/naming-convention
	Description: () => JSX.Element | null;
	children: React.ReactNode;
};

const SettingsSection = ( {
	Description = () => null,
	children,
	...props
}: SettingsSectionProps ): JSX.Element => (
	<div className="settings-section-wrapper" { ...props }>
		<div className="settings-description-wrapper">
			<Description />
		</div>
		<div className="settings-section-controls">{ children }</div>
	</div>
);

export default SettingsSection;
