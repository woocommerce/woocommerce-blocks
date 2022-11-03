/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { SettingsModal } from '../shared-components';
import EditPickupLocationForm from './edit-pickup-location-form';
import type { PickupLocation } from './types';

const EditPickupLocation = ( {
	locationData,
	onClose = () => {},
	onSave,
}: {
	locationData: PickupLocation;
	onClose: () => void;
	onSave: ( location: PickupLocation ) => void;
} ): JSX.Element | null => {
	const formRef = useRef( null );
	const isSaving = false;
	const isDisabled = false;
	const [ values, setValues ] = useState( locationData );

	if ( ! locationData ) {
		return null;
	}

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
						onClick={ () => {
							onSave( values );
							onClose();
						} }
					>
						{ __( 'Save', 'woo-gutenberg-products-block' ) }
					</Button>
				</>
			}
		>
			<EditPickupLocationForm
				formRef={ formRef }
				isSaving={ isSaving }
				values={ values }
				setValues={ setValues }
			/>
		</SettingsModal>
	);
};

export default EditPickupLocation;
