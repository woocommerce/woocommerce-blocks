export type NoticeProps = {
	id: string;
	content: string;
	status: 'success' | 'error' | 'info' | 'warning' | 'default';
	explicitDismiss?: boolean | undefined;
};

export type SnackbarListProps = {
	className?: string | undefined;
	notices: NoticeProps[];
	onRemove: ( id: string ) => void;
	children?: Array< React.ReactNode > | undefined;
};
