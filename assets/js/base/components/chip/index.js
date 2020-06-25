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
 * Component used to render a "chip" -- a list item containing some text with
 * an X button to remove/dismiss each chip.
 *
 * Each chip defaults to a list element but this can be customized by providing
 * a wrapperElement.
 */
const Chip = ( {
	text,
	screenReaderText,
	element = 'li',
	className = '',
	onRemove = () => void null,
	disabled = false,
	radius = 'small',
	removeOnClick = false,
	/* translators: Remove chip. */
	ariaLabel = __( 'Remove', 'woo-gutenberg-products-block' ),
	...props
} ) => {
	const Wrapper = removeOnClick ? 'button' : element;
	const wrapperClassName = classNames(
		className,
		'wc-block-components-chip',
		'wc-block-components-chip--radius-' + radius
	);
	const RemoveElement = ! removeOnClick ? 'button' : 'span';
	const clickableElementProps = {
		'aria-label':
			ariaLabel || typeof text !== 'string'
				? ariaLabel
				: sprintf(
						/* translators: %s text of the chip to remove. */
						__( 'Remove "%s"', 'woo-gutenberg-products-block' ),
						text
				  ),
		disabled,
		onClick: onRemove,
		onKeyDown: ( e ) => {
			if ( e.key === 'Backspace' || e.key === 'Delete' ) {
				onRemove();
			}
		},
	};
	const wrapperProps = removeOnClick ? clickableElementProps : {};
	const removeProps = removeOnClick
		? { 'aria-hidden': true }
		: clickableElementProps;
	const showScreenReaderText = screenReaderText && screenReaderText !== text;

	return (
		// @ts-ignore
		<Wrapper
			className={ wrapperClassName }
			{ ...wrapperProps }
			{ ...props }
		>
			<span
				aria-hidden={ showScreenReaderText }
				className="wc-block-components-chip__text"
			>
				{ text }
			</span>
			{ showScreenReaderText && (
				<span className="screen-reader-text">
					{ screenReaderText ? screenReaderText : text }
				</span>
			) }
			<RemoveElement
				className="wc-block-components-chip__remove"
				{ ...removeProps }
			>
				🗙
			</RemoveElement>
		</Wrapper>
	);
};

Chip.propTypes = {
	text: PropTypes.node.isRequired,
	screenReaderText: PropTypes.string,
	element: PropTypes.elementType,
	className: PropTypes.string,
	onRemove: PropTypes.func,
	disabled: PropTypes.bool,
	radius: PropTypes.oneOf( [ 'none', 'small', 'medium', 'large' ] ),
	removeOnClick: PropTypes.bool,
	ariaLabel: PropTypes.string,
};

export default Chip;
