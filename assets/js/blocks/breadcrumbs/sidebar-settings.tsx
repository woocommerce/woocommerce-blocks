/**
 * External dependencies
 */
import { InspectorControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { getSetting } from '@woocommerce/settings';
import { createInterpolateElement } from '@wordpress/element';
import { PanelBody, ExternalLink } from '@wordpress/components';

const AccountSettingsLink = () => {
	const accountSettingsUrl = `${ getSetting(
		'adminUrl'
	) }admin.php?page=wc-settings&tab=account`;

	const linkText = createInterpolateElement(
		`<a>${ __(
			'Manage account settings',
			'woo-gutenberg-products-block'
		) }</a>`,
		{
			a: <ExternalLink href={ accountSettingsUrl } />,
		}
	);

	return <div className="account-link">{ linkText }</div>;
};

export const BlockSettings = () => {
	return (
		<InspectorControls key="inspector">
			<AccountSettingsLink />
			<PanelBody
				title={ __(
					'Display settings',
					'woo-gutenberg-products-block'
				) }
			/>
		</InspectorControls>
	);
};
