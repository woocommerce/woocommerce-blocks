/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon, external } from '@wordpress/icons';
import { VisuallyHidden } from '@wordpress/components';
import { sanitizeHTML } from '@woocommerce/utils';

/**
 * Internal dependencies
 */
import './editor.scss';

export interface ExternalLinkCardProps {
	href: string;
	title: string;
	description?: string;
}

/**
 * Show a link that displays a title, description, and an icon showing that the link is external.
 * Links are opened in a new tab.
 */
const ExternalLinkCard = ( {
	href,
	title,
	description,
}: ExternalLinkCardProps ): JSX.Element => {
	return (
		<a
			href={ href }
			className="wc-block-editor-components-external-link-card"
			target="_blank"
			rel="noreferrer"
		>
			<span className="wc-block-editor-components-external-link-card__content">
				<strong className="wc-block-editor-components-external-link-card__title">
					{ title }
				</strong>
				{ description && (
					<span
						className="wc-block-editor-components-external-link-card__description"
						dangerouslySetInnerHTML={ {
							__html: sanitizeHTML( description ),
						} }
					></span>
				) }
			</span>
			<VisuallyHidden as="span">
				{
					/* translators: accessibility text */
					__( '(opens in a new tab)', 'woo-gutenberg-products-block' )
				}
			</VisuallyHidden>
			<Icon
				icon={ external }
				className="wc-block-editor-components-external-link-card__icon"
			/>
		</a>
	);
};

export default ExternalLinkCard;
