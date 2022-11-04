/**
 * External dependencies
 */
import styled from '@emotion/styled';

/**
 * Internal dependencies
 */
import GeneralSettings from './general-settings';
import LocationSettings from './location-settings';
import SaveSettings from './save';
import { SettingsProvider } from './settings-context';

const SettingsWrapper = styled.div`
	margin: 24px auto 0;
	max-width: 1032px;
	display: flex;
	flex-flow: column;

	@media ( min-width: 960px ) {
		padding: 0 56px;
	}
`;

const SettingsPage = () => {
	return (
		<SettingsWrapper>
			<SettingsProvider>
				<GeneralSettings />
				<LocationSettings />
				<SaveSettings />
			</SettingsProvider>
		</SettingsWrapper>
	);
};

export default SettingsPage;
