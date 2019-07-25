/**
 * External dependencies
 */
import { format } from '@wordpress/date';

const dateTemplate = ( { date } ) => { // @todo export it to it's own file
	return (
		<time className="wc-block-reviews-by-product__published-date" dateTime={ date }>{ format( 'F j, Y', date ) }</time>
	);
};

export default dateTemplate;
