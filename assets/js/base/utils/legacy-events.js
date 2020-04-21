const Event = window.Event || null;

export const triggerFragmentRefresh = () => {
	// In IE, Event is an object and can't be instantiated with `new Event()`.
	if ( typeof Event === 'function' ) {
		const event = new Event( 'wc_fragment_refresh', {
			bubbles: true,
			cancelable: true,
		} );
		document.body.dispatchEvent( event );
	} else {
		const event = document.createEvent( 'Event' );
		event.initEvent( 'wc_fragment_refresh', true, true );
		document.body.dispatchEvent( event );
	}
};
