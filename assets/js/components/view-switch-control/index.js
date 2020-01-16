/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ButtonGroup, Button } from '@wordpress/components';
import withComponentId from '@woocommerce/base-hocs/with-component-id';

/**
 * Internal dependencies
 */
import './editor.scss';

const ViewSwitchControl = ( {
	className,
	label = __( 'View', 'woo-gutenberg-products-block' ),
	views = [],
	selected = '',
	onChange = () => {},
	componentId,
} ) => {
	const classes = classnames( className, 'wc-block-view-switch-control' );
	const htmlId = 'wc-block-view-switch-control-' + componentId;

	return (
		<div className={ classes }>
			<label
				htmlFor={ htmlId }
				className="wc-block-view-switch-control__label"
			>
				{ label + ': ' }
			</label>
			<ButtonGroup id={ htmlId }>
				{ views.map( ( view ) => (
					<Button
						key={ view.value }
						isPrimary={ selected === view.value }
						isLarge
						aria-pressed={ selected === view.value }
						onClick={ () => {
							onChange( view.value );
						} }
					>
						{ view.name }
					</Button>
				) ) }
			</ButtonGroup>
		</div>
	);
};

ViewSwitchControl.propTypes = {
	/**
	 * Custom class name to add to component.
	 */
	className: PropTypes.string,
	/**
	 * List of views.
	 */
	views: PropTypes.arrayOf(
		PropTypes.shape( {
			name: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
		} )
	).isRequired,
	/**
	 * The selected view.
	 */
	selected: PropTypes.string.isRequired,
	/**
	 * Callback fired when the selected view changes.
	 */
	onChange: PropTypes.func,
	// from withComponentId
	componentId: PropTypes.number.isRequired,
};

export default withComponentId( ViewSwitchControl );
