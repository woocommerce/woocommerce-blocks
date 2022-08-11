interface Props {
	isLoading: boolean;
	width: string;
	height: string;
}

const LoadingPlaceHolder = ( { isLoading, width, height }: Props ) => {
	if ( ! isLoading ) return null;
	return (
		<div
			className="wc-block-loading-placeholder"
			style={ { width, height } }
		/>
	);
};

export default LoadingPlaceHolder;
