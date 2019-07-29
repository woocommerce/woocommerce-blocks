import { Component } from 'react';

const ids = [];

/**
 * HOC that gives a component a unique ID.
 *
 * This is an alternative for withInstanceId from @wordpress/compose to avoid using that dependency on the frontend.
 */
const withComponentID = ( OriginalComponent ) => {
	return class WrappedComponent extends Component {
		generateUniqueID() {
			const group = WrappedComponent.name;

			if ( ! ids[ group ] ) {
				ids[ group ] = 0;
			}

			ids[ group ]++;

			return ids[ group ];
		}

		render() {
			const componentID = this.generateUniqueID();

			return <OriginalComponent
				{ ...this.props }
				componentID={ componentID }
			/>;
		}
	};
};

export default withComponentID;
