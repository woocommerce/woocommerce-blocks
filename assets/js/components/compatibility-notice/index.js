/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import { Guide } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { __experimentalCreateInterpolateElement } from 'wordpress-element';

/**
 * Internal dependencies
 */
import WooImage from './woo-image';

export default function CompatibilityNotice() {
	const [ isOpen, setIsOpen ] = useState( true );
	if ( ! isOpen ) {
		return null;
	}

	return (
		<Guide
			className="edit-post-welcome-guide"
			contentLabel={ __( 'Compatibility notice' ) }
			onFinish={ () => setIsOpen( false ) }
			finishButtonText={ __( 'Got it!' ) }
			pages={ [
				{
					image: <WooImage />,
					content: (
						<>
							<h1 className="edit-post-welcome-guide__heading">
								{ __(
									'Compatibility notice',
									'woo-gutenberg-products-block'
								) }
							</h1>
							<p className="edit-post-welcome-guide__text">
								{ __experimentalCreateInterpolateElement(
									__(
										'<b>This block is in beta</b> and may not be compatible with all checkout extensions and integrations.<br />We recommend reviewing our <a>expanding list</a> of compatible extensions prior to using this block on a live store. Thanks for checkout out the beta.',
										'woo-gutenberg-products-block'
									),
									{
										a: (
											// eslint-disable-next-line jsx-a11y/anchor-has-content
											<a
												href="https://woocommerce.com"
												target="_blank"
												rel="noopener noreferrer"
											/>
										),
										b: <b />,
										br: <br />,
									}
								) }
							</p>
						</>
					),
				},
			] }
		/>
	);
}
