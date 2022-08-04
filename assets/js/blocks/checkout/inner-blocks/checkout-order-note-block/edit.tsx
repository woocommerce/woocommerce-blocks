/**
 * External dependencies
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import Noninteractive from '@woocommerce/base-components/noninteractive';
import { CheckoutSidebarCompatibilityNotice } from '@woocommerce/editor-components/sidebar-compatibility-notice';

/**
 * Internal dependencies
 */
import Block from './block';
import './editor.scss';

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps();
	return (
		<div { ...blockProps }>
			<InspectorControls>
				<CheckoutSidebarCompatibilityNotice />
			</InspectorControls>
			<Noninteractive>
				<Block />
			</Noninteractive>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() } />;
};
