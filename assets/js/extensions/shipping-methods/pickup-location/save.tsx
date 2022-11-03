/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import styled from '@emotion/styled';
import { Button } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { SettingsSection } from '../shared-components';
import useSettings from './use-settings';

const SaveSectionWrapper = styled( SettingsSection )`
	text-align: right;
`;

const SaveSettings = () => {
	const { isSaving, save } = useSettings();

	return (
		<SaveSectionWrapper>
			<Button
				variant="primary"
				isBusy={ isSaving }
				disabled={ isSaving }
				onClick={ () => save() }
			>
				{ __( 'Save changes', 'woo-gutenberg-products-block' ) }
			</Button>
		</SaveSectionWrapper>
	);
};

export default SaveSettings;
