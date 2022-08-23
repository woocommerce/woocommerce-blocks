/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { PlainText } from '@wordpress/block-editor';
import { withInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { Disabled } from '@wordpress/components';

/**
 * Internal dependencies
 */
import './editor.scss';

const BlockTitle = ( {
	className,
	headingLevel,
	onChange,
	heading,
	instanceId,
	disabled = false,
} ) => {
	const TagName = `h${ headingLevel }`;
	const Component = () => (
		<TagName className={ className }>
			<label
				className="screen-reader-text"
				htmlFor={ `block-title-${ instanceId }` }
			>
				{ __( 'Block title', 'woo-gutenberg-products-block' ) }
			</label>
			<PlainText
				id={ `block-title-${ instanceId }` }
				className="wc-block-editor-components-title"
				value={ heading }
				onChange={ onChange }
			/>
		</TagName>
	);

	if ( disabled ) {
		return (
			<Disabled>
				<Component />
			</Disabled>
		);
	}

	return <Component />;
};

BlockTitle.propTypes = {
	/**
	 * Classname to add to title in addition to the defaults.
	 */
	className: PropTypes.string,
	/**
	 * The value of the heading.
	 */
	value: PropTypes.string,
	/**
	 * Callback to update the attribute when text is changed.
	 */
	onChange: PropTypes.func,
	/**
	 * Level of the heading tag (1, 2, 3... will render <h1>, <h2>, <h3>... elements).
	 */
	headingLevel: PropTypes.number,
	/**
	 * If the title is a disabled element
	 */
	disabled: PropTypes.bool,
};

export default withInstanceId( BlockTitle );
