/**
 * External dependencies
 */
import { Modal } from '@wordpress/components';
import classNames from 'classnames';
import { HorizontalRule } from '@wordpress/primitives';

/**
 * Internal dependencies
 */
import './admin.scss';

const SettingsModal = ( {
	children,
	actions,
	className,
	title,
	onRequestClose,
	...props
}: {
	children: React.ReactNode;
	actions: React.ReactNode;
	className?: string;
	title: string;
	onRequestClose: () => void;
} ): JSX.Element => (
	<Modal
		className={ classNames( 'wc-blocks-settings-modal', className ) }
		title={ title }
		onRequestClose={ onRequestClose }
		{ ...props }
	>
		{ children }
		<HorizontalRule className="wc-blocks-settings-modal__separator" />
		<div className="wc-blocks-settings-modal__footer">{ actions }</div>
	</Modal>
);

export default SettingsModal;
