/**
 * External dependencies
 */
import { Modal } from '@wordpress/components';
import classNames from 'classnames';
import { HorizontalRule } from '@wordpress/primitives';
import styled from '@emotion/styled';

const StyledModal = styled( Modal )`
	// increasing the specificity of the styles, to ensure it is honored
	&#{&} {
		max-width: 600px;
		@media ( min-width: 600px ) {
			min-width: 400px;
		}
	}

	// to ensure that the separator extends all the way, even with different versions of Gutenberg
	.components-modal__content {
		padding: 0 24px 16px;

		@media ( max-width: 599px ) {
			display: flex;
			flex-direction: column;

			hr:last-of-type {
				margin-top: auto;
			}
		}
	}

	.components-modal__header {
		padding: 0 24px;
		@media ( max-width: 599px ) {
			button {
				display: none;
			}
		}
	}
`;

const StyledSeparator = styled( HorizontalRule )`
	margin: 16px -#{24px};
`;

const StyledFooter = styled.div`
	display: flex;
	justify-content: flex-end;

	> * {
		&:not( :first-child ) {
			margin-left: 8px;
		}
	}
`;

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
	<StyledModal
		className={ classNames( 'wc-blocks-settings-modal', className ) }
		title={ title }
		onRequestClose={ onRequestClose }
		{ ...props }
	>
		{ children }
		<StyledSeparator className="wc-blocks-settings-modal__separator" />
		<StyledFooter className="wc-blocks-settings-modal__footer">
			{ actions }
		</StyledFooter>
	</StyledModal>
);

export default SettingsModal;
