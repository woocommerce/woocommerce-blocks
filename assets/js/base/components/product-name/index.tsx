/**
 * External dependencies
 */
import { decodeEntities } from '@wordpress/html-entities';
import classnames from 'classnames';
import { AnchorHTMLAttributes, HTMLAttributes } from 'react';

/**
 * Internal dependencies
 */
import './style.scss';

interface ProductNameProps extends AnchorHTMLAttributes< HTMLAnchorElement > {
	disabled?: boolean;
	name: string;
	permalink?: string;
	format?: string;
	onClick?: () => void;
}

/**
 * Render the Product name.
 *
 * The store API runs titles through `wp_kses_post()` which removes dangerous HTML tags, so using it inside `dangerouslySetInnerHTML` is considered safe.
 */
export default ( {
	className = '',
	disabled = false,
	name,
	permalink = '',
	rel,
	style,
	onClick,
	format = '<name/>',
	...props
}: ProductNameProps ): JSX.Element => {
	const classes = classnames( 'wc-block-components-product-name', className );
	if ( ! format.includes( '<name/>' ) ) {
		format = '<name/>';
		// eslint-disable-next-line no-console
		console.error(
			'Product name formats need to include the `<name/>` tag.'
		);
	}

	const formattedName = format.replace( '<name/>', name );

	if ( disabled ) {
		// Cast the props as type HTMLSpanElement.
		const disabledProps = props as HTMLAttributes< HTMLSpanElement >;
		return (
			<span
				className={ classes }
				{ ...disabledProps }
				dangerouslySetInnerHTML={ {
					__html: decodeEntities( formattedName ),
				} }
			/>
		);
	}
	return (
		<a
			className={ classes }
			href={ permalink }
			rel={ rel }
			{ ...props }
			dangerouslySetInnerHTML={ {
				__html: decodeEntities( formattedName ),
			} }
		/>
	);
};
