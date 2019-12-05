/**
 * External dependencies
 */
import { Button } from '@wordpress/components';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

function TextToolbarButton( props ) {
	const classes = classnames(
		'wc-block-text-toolbar-button',
		props.className
	);
	return (
		<Button className={ classes } { ...props } />
	);
}

export default TextToolbarButton;
