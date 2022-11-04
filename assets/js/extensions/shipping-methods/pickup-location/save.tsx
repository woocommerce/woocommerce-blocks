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
import { useSettingsContext } from './settings-context';

const SaveSectionWrapper = styled( SettingsSection )`
	text-align: right;
`;

const SaveSettings = () => {
	const { isSaving, save } = useSettingsContext();

	return (
		<SaveSectionWrapper className={ 'submit' }>
			<Button
				variant="primary"
				isBusy={ isSaving }
				disabled={ isSaving }
				onClick={ save }
			>
				{ __( 'Save changes', 'woo-gutenberg-products-block' ) }
			</Button>
		</SaveSectionWrapper>
	);
};

export default SaveSettings;
