export interface NoticeSnackbarProps {
	className?: string | undefined;
	status: 'success' | 'error' | 'info' | 'warning' | 'default';
	politeness?: 'polite' | 'assertive' | undefined;
	explicitDismiss?: boolean | undefined;
	spokenMessage?: string | React.ReactNode | undefined;
	// Function called when dismissing the notice
	onRemove?: ( () => void ) | undefined;
	// The displayed message of a notice. Also used as the spoken message for assistive technology, unless `spokenMessage` is provided as an alternative message.
	children: React.ReactNode;
	/**
	 * A ref to the list that contains the snackbar.
	 */
	listRef?: React.MutableRefObject< HTMLDivElement | null > | undefined;
}
