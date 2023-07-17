/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalToggleGroupControlOption as ToggleGroupControlOption,
	__experimentalToggleGroupControl as ToggleGroupControl,
} from '@wordpress/components';
import { Icon } from '@wordpress/icons';
import {
	thumbnailsLeft,
	thumbnailsBottom,
	thumbnailsRight,
} from '@woocommerce/icons';

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-editor-product-gallery_thumbnails',
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'woo-gutenberg-products-block' ) }
				>
					<ToggleGroupControl
						className="wc-block-editor-product-gallery-thumbnails__thumbnails-toggle"
						isBlock={ true }
						label={ __(
							'Thumbnails',
							'woo-gutenberg-products-block'
						) }
						value={ <Icon size={ 32 } icon={ thumbnailsLeft } /> }
						help={ __(
							'No thumbnails will be displayed.',
							'woo-gutenberg-products-block'
						) }
					>
						<ToggleGroupControlOption
							value={ 'off' }
							label={ __(
								'Off',
								'woo-gutenberg-products-block'
							) }
						/>
						<ToggleGroupControlOption
							value={ 'left' }
							label={
								<Icon size={ 32 } icon={ thumbnailsLeft } />
							}
						/>
						<ToggleGroupControlOption
							value={ 'bottom' }
							label={
								<Icon size={ 32 } icon={ thumbnailsBottom } />
							}
						/>
						<ToggleGroupControlOption
							value={ 'right' }
							label={
								<Icon size={ 32 } icon={ thumbnailsRight } />
							}
						/>
					</ToggleGroupControl>
				</PanelBody>
			</InspectorControls>
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
