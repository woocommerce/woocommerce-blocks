const w = window || {};

const withBrowserWindowProp = ( prop, propMap ) => ( WrappedComponent ) => (
	incomingProps
) => {
	const props = w.hasOwnProperty( prop )
		? propMap( w[ prop ], incomingProps )
		: {};
	return <WrappedComponent { ...incomingProps } { ...props } />;
};

export default withBrowserWindowProp;
