/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { useRef, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { SettingsModal } from '../../shared-components';
import Form from './form';
import type { PickupLocation } from '../types';

const EditLocation = ( {
	locationData,
	onClose,
	onSave,
}: {
	locationData: PickupLocation;
	onClose: () => void;
	onSave: ( location: PickupLocation ) => void;
} ): JSX.Element | null => {
	const formRef = useRef( null );
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
