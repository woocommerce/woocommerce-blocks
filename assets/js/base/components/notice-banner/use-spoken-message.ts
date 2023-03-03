/**
 * External dependencies
 */
import { useEffect, renderToString } from '@wordpress/element';
import { speak } from '@wordpress/a11y';

/**
 * Internal dependencies
 */
import type { NoticeProps } from './types';

/**
 * Custom hook which announces the message with the given politeness, if a
 * valid message is provided.
 */
const useSpokenMessage = (
	message: NoticeProps[ 'spokenMessage' ],
	politeness: NoticeProps[ 'politeness' ]
) => {
	const spokenMessage =
		typeof message === 'string' ? message : renderToString( message );

	useEffect( () => {
		if ( spokenMessage ) {
			speak( spokenMessage, politeness );
		}
	}, [ spokenMessage, politeness ] );
};

export default useSpokenMessage;
