/**
 * External dependencies
 */
import { useState } from '@wordpress/element';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Icon, chevronUp, chevronDown } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import './style.scss';

const DisclosureWidget = ( {
	children,
	className,
	initialOpen = false,
	title,
	titleTag: TitleTag = 'div',
} ) => {
	const [ isOpen, setIsOpen ] = useState( initialOpen );

	return (
		<div
			className={ classNames(
				className,
				'wc-blocks-components-disclosure-widget'
			) }
		>
			<TitleTag>
				<button
					aria-expanded={ isOpen }
					className="wc-blocks-components-disclosure-widget__button"
					onClick={ () => setIsOpen( ! isOpen ) }
				>
					<Icon
						aria-hidden="true"
						className="wc-blocks-components-disclosure-widget__button-icon"
						srcElement={ isOpen ? chevronUp : chevronDown }
					/>
					{ title }
				</button>
			</TitleTag>
			<div
				className="wc-blocks-components-disclosure-widget__content"
				hidden={ ! isOpen }
			>
				{ children }
			</div>
		</div>
	);
};

DisclosureWidget.propTypes = {
	className: PropTypes.string,
	initialOpen: PropTypes.bool,
	title: PropTypes.element,
	titleTag: PropTypes.string,
};

export default DisclosureWidget;
