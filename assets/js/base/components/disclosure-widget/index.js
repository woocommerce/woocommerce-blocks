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
	buttonContent,
	buttonWrapperTag = 'div',
	children,
	className,
	initialOpen = false,
} ) => {
	const [ isOpen, setIsOpen ] = useState( initialOpen );

	const TagName = `${ buttonWrapperTag }`;
	return (
		<div
			className={ classNames(
				className,
				'wc-blocks-components-disclosure-widget'
			) }
		>
			<TagName>
				<button
					className="wc-blocks-components-disclosure-widget__button"
					onClick={ () => setIsOpen( ! isOpen ) }
				>
					<Icon
						aria-hidden="true"
						className="wc-blocks-components-disclosure-widget__button-icon"
						srcElement={ isOpen ? chevronUp : chevronDown }
					/>
					{ buttonContent }
				</button>
			</TagName>
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
	buttonContent: PropTypes.element,
	buttonWrapperTag: PropTypes.string,
	className: PropTypes.string,
	initialOpen: PropTypes.bool,
};

export default DisclosureWidget;
