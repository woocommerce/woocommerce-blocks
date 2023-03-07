export interface NoticeBannerProps {
	// The displayed message of a notice. Also used as the spoken message for assistive technology, unless `spokenMessage` is provided as an alternative message.
	children: React.ReactNode;
	// Additional class name to give to the notice.
	className?: string | undefined;
	// Determines whether the notice can be dismissed by the user.
	isDismissible?: boolean | undefined;
	// Function called when dismissing the notice.
	onRemove?: ( () => void ) | undefined;
	// Determines the level of politeness for the notice when read by screen readers.
	politeness?: 'polite' | 'assertive' | undefined;
	// Optionally provided to change the spoken message for assistive technology.
	spokenMessage?: string | React.ReactNode | undefined;
	// Status determines the color of the notice and the icon.
	status: 'success' | 'error' | 'info' | 'warning' | 'default';
	// Summary text shown above passed notices/children.
	summary?: string | undefined;
}
