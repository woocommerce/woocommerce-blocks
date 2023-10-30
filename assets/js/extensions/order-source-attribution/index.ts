/**
 * External dependencies
 */
import { CHECKOUT_STORE_KEY } from '@woocommerce/block-data';
import { dispatch } from '@wordpress/data';

const sb = window.sbjs || {};
dispatch( CHECKOUT_STORE_KEY ).__internalSetExtensionData(
	'order-source-attribution',
	{
		type: sb.get.current.typ,
		url: sb.get.current_add.rf,
		utm_campaign: sb.get.current.cmp,
		utm_source: sb.get.current.src,
		utm_medium: sb.get.current.mdm,
		utm_content: sb.get.current.cnt,
		utm_id: sb.get.current.id,
		utm_term: sb.get.current.trm,
		session_entry: sb.get.current_add.ep,
		session_start_time: sb.get.current_add.fd,
		session_pages: sb.get.session.pgs,
		session_count: sb.get.udata.vst,
		user_agent: sb.get.udata.uag,
	}
);
