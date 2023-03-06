export interface NoticeBannerProps {
	className?: string | undefined;
	status: 'success' | 'error' | 'info' | 'warning' | 'default';
	politeness?: 'polite' | 'assertive' | undefined;
	isDismissible?: boolean | undefined;
	spokenMessage?: string | React.ReactNode | undefined;
	// Function called when dismissing the notice
	onRemove?: ( () => void ) | undefined;
	// The displayed message of a notice. Also used as the spoken message for assistive technology, unless `spokenMessage` is provided as an alternative message.
	children: React.ReactNode;
}
