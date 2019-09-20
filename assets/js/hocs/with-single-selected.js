/**
 * External dependencies
 */
import { Component } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import PropTypes from 'prop-types';
import { isNil } from 'lodash';

const withSingleSelected = createHigherOrderComponent(
	( OriginalComponent ) => {
		class WrappedComponent extends Component {
			render() {
				const { selected } = this.props;

				return (
					<OriginalComponent
						{ ...this.props }
						selected={ [ selected ].filter(
							( val ) => ! isNil( val )
						) }
					/>
				);
			}
		}
		WrappedComponent.propTypes = {
			selected: PropTypes.oneOfType( [
				PropTypes.number,
				PropTypes.string,
			] ),
		};
		WrappedComponent.defaultProps = {
			selected: null,
		};
		return WrappedComponent;
	},
	'withSingleSelected'
);

export default withSingleSelected;
