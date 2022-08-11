interface Props {
	isLoading?: boolean;
	width?: string;
	height: string;
	style?: Record< string, string | number >;
}

const LoadingPlaceHolder = ( {
	isLoading = true,
	width,
	height,
	style,
}: Props ) => {
	if ( ! isLoading ) return null;
	return (
		<div
			className="wc-block-loading-placeholder"
			style={ {
				width,
				height,
				...style,
			} }
		/>
	);
};

export default LoadingPlaceHolder;
