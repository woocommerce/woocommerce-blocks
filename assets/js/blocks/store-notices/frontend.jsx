/**
 * External dependencies
 */
import { info, megaphone, check } from '@wordpress/icons';
import { store } from '@woocommerce/interactivity';

const Comp = () => <div>hi</div>;

store(
	// @ts-expect-error: Store function isn't typed.
	{
		selectors: {
			woocommerce: {
				noticeClassNames: ( { state } ) =>
					`wc-block-components-notice-banner is-${ state.woocommerce.notice.status }`,
				noticeIcon: ( { state } ) => {
					debugger;
					return Comp;
				},
			},
		},
		actions: {
			woocommerce: {
				addNotice: ( { state }, message, status ) => {
					state.woocommerce.dismissServerNotices = true;
					state.woocommerce.notice = { message, status };
				},
				dismissNotice: ( { state } ) => {
					state.woocommerce.notice = {
						message: '',
						status: 'default',
					};
				},
			},
		},
	}
);
