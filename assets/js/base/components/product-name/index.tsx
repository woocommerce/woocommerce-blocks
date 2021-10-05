/**
 * External dependencies
 */
import { decodeEntities } from '@wordpress/html-entities';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

interface ProductNameProps {
	className?: string;
	disabled?: boolean;
	name: string;
	permalink?: string;
	rel?: string | null;
	style?: Record< string, unknown >;
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
	...props
}: ProductNameProps ): JSX.Element => {
	const classes = classnames( 'wc-block-components-product-name', className );
	return disabled ? (
		<span
			className={ classes }
			{ ...props }
			dangerouslySetInnerHTML={ {
				__html: decodeEntities( name ),
			} }
		/>
	) : (
		<a
			className={ classes }
			href={ permalink }
			{ ...props }
			dangerouslySetInnerHTML={ {
				__html: decodeEntities( name ),
			} }
		/>
	);
};
