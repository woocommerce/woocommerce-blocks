/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Component used to render a "chip" -- that is a list of inline items, each
 * containing some text with an X button to remove/dismiss each chip.
 *
 * Each chip defaults to a list element but this can be customized by providing
 * a wrapperElement.
 */
const Chip = ( {
	text,
	element = 'li',
	className = '',
	onRemove = () => {},
	disabled = false,
	radius = 'small',
} ) => {
	const Wrapper = element;
	const wrapperClassName = classNames(
		className,
		'wc-block-components-chip',
		'wc-block-components-chip--radius-' + radius
	);

	return (
		// @ts-ignore
		<Wrapper className={ wrapperClassName }>
			{ text }
			<button
				className="wc-block-components-chip__remove"
				onClick={ onRemove }
				disabled={ disabled }
				aria-label={ sprintf(
					/* translators: %s chip text. */
					__( 'Remove "%s"', 'woo-gutenberg-products-block' ),
					text
				) }
			>
				✕
			</button>
		</Wrapper>
	);
};

Chip.propTypes = {
	text: PropTypes.node.isRequired,
	element: PropTypes.elementType,
	className: PropTypes.string,
	onRemove: PropTypes.func,
	radius: PropTypes.oneOf( [ 'none', 'small', 'medium', 'large' ] ),
};

export default Chip;
