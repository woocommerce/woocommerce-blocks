/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { SettingsModal } from '../shared-components';
import Form from './edit-pickup-location-form';

const EditPickupLocation = ( { onClose = () => {} } ) => {
	const formRef = useRef( null );
	const isSaving = false;
	const isDisabled = false;

	return (
		<SettingsModal
			onRequestClose={ onClose }
			title={ __(
				'Edit Pickup Location',
				'woo-gutenberg-products-block'
			) }
			actions={
				<>
					<Button
						isSecondary
						onClick={ onClose }
						disabled={ isDisabled }
					>
						{ __( 'Cancel', 'woo-gutenberg-products-block' ) }
					</Button>
					<Button
						isPrimary
						isBusy={ isSaving || isDisabled }
						disabled={ isDisabled }
						onClick={ () => {} }
					>
						{ __( 'Save', 'woo-gutenberg-products-block' ) }
					</Button>
				</>
			}
		>
			<Form formRef={ formRef } />
		</SettingsModal>
	);
};

export default EditPickupLocation;
