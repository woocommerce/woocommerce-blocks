/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { createContext, useContext } from '@wordpress/element';
import { useContainerQueries } from '@woocommerce/base-hooks';
import classNames from 'classnames';

const ContainerQueryContext = createContext( {
	containerQueryClassName: '',
	isMobile: false,
	isSmall: false,
	isMedium: false,
	isLarge: false,
	isLoading: true,
} );

export const useContainerQueryContext = () => {
	return useContext( ContainerQueryContext );
};

/**
 * Provides an interface to useContainerQueries so children can see what size is
 * being used by the container.
 */
export const ContainerQueryContextProvider = ( {
	children,
	className = '',
} ) => {
	const [ resizeListener, containerQueryClassName ] = useContainerQueries();

	const contextValue = {
		containerQueryClassName,
		isMobile: containerQueryClassName === 'is-mobile',
		isSmall: containerQueryClassName === 'is-small',
		isMedium: containerQueryClassName === 'is-medium',
		isLarge: containerQueryClassName === 'is-large',
		isLoading: containerQueryClassName === '',
	};

	return (
		<ContainerQueryContext.Provider value={ contextValue }>
			<div className={ classNames( className, containerQueryClassName ) }>
				{ resizeListener }
				{ children }
			</div>
		</ContainerQueryContext.Provider>
	);
};

ContainerQueryContextProvider.propTypes = {
	children: PropTypes.node,
};
