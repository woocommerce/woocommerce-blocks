/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import elementType from 'prop-types-elementtype';
import { Fragment } from 'react';
import classNames from 'classnames';

const Label = ( { label, screenReaderLabel, wrapperElement: Wrapper, wrapperProps } ) => {
	if ( label && screenReaderLabel && label !== screenReaderLabel ) {
		return (
			<Wrapper { ...wrapperProps }>
				<span aria-hidden>
					{ label }
				</span>
				<span className="screen-reader-text">
					{ screenReaderLabel }
				</span>
			</Wrapper>
		);
	}

	if ( ! label && screenReaderLabel ) {
		if ( typeof Wrapper === 'symbol' && Symbol.keyFor( Wrapper ) === 'react.fragment' ) {
			Wrapper = 'span';
		}
		wrapperProps = {
			...wrapperProps,
			className: classNames( wrapperProps.className, 'screen-reader-text' ),
		};

		return (
			<Wrapper { ...wrapperProps }>
				{ screenReaderLabel }
			</Wrapper>
		);
	}

	return (
		<Wrapper { ...wrapperProps }>
			{ label }
		</Wrapper>
	);
};

Label.propTypes = {
	label: PropTypes.string,
	screenReaderLabel: PropTypes.string,
	wrapperElement: PropTypes.oneOfType( [
		PropTypes.string,
		elementType,
	] ),
	wrapperProps: PropTypes.object,
};

Label.defaultProps = {
	wrapperElement: Fragment,
	wrapperProps: {},
};

export default Label;
