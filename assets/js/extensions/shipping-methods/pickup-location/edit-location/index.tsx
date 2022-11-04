/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';
import type { UniqueIdentifier } from '@dnd-kit/core';

/**
 * Internal dependencies
 */
import { SettingsModal } from '../../shared-components';
import Form from './form';
import type { PickupLocation } from '../types';

const EditLocation = ( {
	locationData,
	editingLocation,
	onClose,
	onSave,
}: {
	locationData: PickupLocation | null;
	editingLocation: UniqueIdentifier | 'new';
	onClose: () => void;
	onSave: ( location: PickupLocation ) => void;
} ): JSX.Element | null => {
	const formRef = useRef( null );
	const [ values, setValues ] = useState< PickupLocation >(
		locationData as PickupLocation
	);

	if ( ! locationData ) {
		return null;
	}

	return (
		<SettingsModal
			onRequestClose={ onClose }
			title={
				editingLocation === 'new'
					? __(
							'Add Pickup Location',
							'woo-gutenberg-products-block'
					  )
					: __(
							'Edit Pickup Location',
							'woo-gutenberg-products-block'
					  )
			}
			actions={
				<>
					<Button variant="secondary" onClick={ onClose }>
						{ __( 'Cancel', 'woo-gutenberg-products-block' ) }
					</Button>
					<Button
						variant="primary"
						onClick={ () => {
							onSave( values );
							onClose();
						} }
					>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</>
			}
		>
			<Form
				formRef={ formRef }
				values={ values }
				setValues={ setValues }
			/>
		</SettingsModal>
	);
};

export default EditLocation;
