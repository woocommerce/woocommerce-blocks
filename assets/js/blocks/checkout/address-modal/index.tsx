/**
 * External dependencies
 */
import { Modal } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

const AddressModal = ( {
	children,
	actions,
	...props
}: {
	children: React.ReactNode;
	actions: React.ReactNode;
} ): JSX.Element => {
	const [ isHidden, setIsHidden ] = useState( true );

	const className = classnames( 'wc-block-components-address-modal', {
		'wc-block-components-address-modal--hidden': isHidden,
	} );
	const overlayClassName =
		'wc-block-components-address-modal__screen-overlay';
	const footerClassName = 'wc-block-components-address-modal__footer';

	useEffect( () => {
		setIsHidden( false );
	}, [] );

	return (
		<Modal
			className={ className }
			id="wc-block-components-address-modal"
			overlayClassName={ overlayClassName }
			shouldCloseOnClickOutside={ false }
			{ ...props }
		>
			{ children }
			<div className={ footerClassName }>{ actions }</div>
		</Modal>
	);
};

export default AddressModal;
