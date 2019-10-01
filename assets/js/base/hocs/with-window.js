const w = window || {};

const withWindow = ( propMap ) => ( WrappedComponent ) => ( incomingProps ) => {
	const props = propMap( w, incomingProps );
	return <WrappedComponent { ...incomingProps } { ...props } />;
};

export default withWindow;
