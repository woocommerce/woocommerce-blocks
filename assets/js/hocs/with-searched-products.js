/**
 * External dependencies
 */
import { Component } from '@wordpress/element';
import { debounce } from 'lodash';
import { createHigherOrderComponent } from '@wordpress/compose';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { isLargeCatalog, getProducts } from '../components/utils';

/**
 * A higher order component that enhances the provided component with products
 * from a search query.
 */
const withSearchedProducts = createHigherOrderComponent( ( OriginalComponent ) => {
	/**
	 * A Component wrapping the passed in component.
	 *
	 * @class WrappedComponent
	 * @augments {Component}
	 */
	class WrappedComponent extends Component {
		constructor() {
			super( ...arguments );
			this.state = {
				list: [],
				loading: true,
			};
			this.debouncedOnSearch = debounce( this.onSearch.bind( this ), 400 );
		}

		componentDidMount() {
			const { selected } = this.props;
			getProducts( { selected } )
				.then( ( list ) => {
					this.setState( { list, loading: false } );
				} )
				.catch( () => {
					this.setState( { list: [], loading: false } );
				} );
		}

		componentWillUnmount() {
			this.debouncedOnSearch.cancel();
		}

		onSearch( search ) {
			const { selected } = this.props;
			getProducts( { selected, search } )
				.then( ( list ) => {
					this.setState( { list, loading: false } );
				} )
				.catch( () => {
					this.setState( { list: [], loading: false } );
				} );
		}

		render() {
			const { list, loading } = this.state;
			const { selected } = this.props;
			return (
				<OriginalComponent
					{ ...this.props }
					products={ list }
					isLoading={ loading }
					selected={ list.filter(
						( { id } ) => selected.includes( id )
					) }
					onSearch={ isLargeCatalog ? this.debouncedOnSearch : null }
				/>
			);
		}
	}
	WrappedComponent.propTypes = {
		selected: PropTypes.array,
	};
	WrappedComponent.defaultProps = {
		selected: [],
	};
	return WrappedComponent;
}, 'withSearchedProducts' );

export default withSearchedProducts;
