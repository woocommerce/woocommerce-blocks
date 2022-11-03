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

const SaveSectionWrapper = styled( SettingsSection )`
	text-align: right;
`;

const SaveSettings = () => {
	const isSaving = false;
	const isDisabled = false;

	return (
		<SaveSectionWrapper>
			<Button
				variant="primary"
				isBusy={ isSaving }
				disabled={ isSaving || isDisabled }
				onClick={ () => {} }
			>
				{ __( 'Save changes', 'woo-gutenberg-products-block' ) }
			</Button>
		</SaveSectionWrapper>
	);
};

export default SaveSettings;
