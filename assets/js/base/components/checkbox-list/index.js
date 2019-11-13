/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { Fragment, useMemo, useState } from '@wordpress/element';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Component used to show a list of checkboxes in a group.
 */
const CheckboxList = ( {
	className,
	onChange = () => {},
	options = [],
	checked = [],
	isLoading = false,
	isDisabled = false,
	limit = 10,
} ) => {
	const [ showExpanded, setShowExpanded ] = useState( false );

	const placeholder = useMemo( () => {
		return [ ...Array( 5 ) ].map( ( x, i ) => (
			<li
				key={ i }
				style={ {
					/* stylelint-disable */
					width: Math.floor( Math.random() * 75 ) + 25 + '%',
				} }
			/>
		) );
	}, [] );

	const renderedShowMore = useMemo( () => {
		const optionCount = options.length;
		return (
			! showExpanded && (
				<li key="show-more" className="show-more">
					<button
						onClick={ () => {
							setShowExpanded( true );
						} }
						aria-expanded={ false }
						aria-label={ sprintf(
							__(
								'Show %s more options',
								'woo-gutenberg-products-block'
							),
							optionCount - limit
						) }
					>
						{ // translators: %s number of options to reveal.
						sprintf(
							__(
								'Show %s more',
								'woo-gutenberg-products-block'
							),
							optionCount - limit
						) }
					</button>
				</li>
			)
		);
	}, [ options, limit, showExpanded ] );

	const renderedShowLess = useMemo( () => {
		return (
			showExpanded && (
				<li key="show-less" className="show-less">
					<button
						onClick={ () => {
							setShowExpanded( false );
						} }
						aria-expanded={ true }
						aria-label={ __(
							'Show less options',
							'woo-gutenberg-products-block'
						) }
					>
						{ __( 'Show less', 'woo-gutenberg-products-block' ) }
					</button>
				</li>
			)
		);
	}, [ showExpanded ] );

	const renderedOptions = useMemo( () => {
		// Truncate options if > the limit + 5.
		const optionCount = options.length;
		const shouldTruncateOptions = optionCount > limit + 5;
		return (
			<Fragment>
				{ options.map( ( option, index ) => (
					<Fragment key={ option.key }>
						<li
							{ ...shouldTruncateOptions &&
								! showExpanded &&
								index >= limit && { hidden: true } }
						>
							<input
								type="checkbox"
								id={ option.key }
								value={ option.key }
								onChange={ onChange }
								checked={ checked.includes( option.key ) }
								disabled={ isDisabled }
							/>
							<label htmlFor={ option.key }>
								{ option.label }
							</label>
						</li>
						{ shouldTruncateOptions &&
							index === limit - 1 &&
							renderedShowMore }
					</Fragment>
				) ) }
				{ shouldTruncateOptions && renderedShowLess }
			</Fragment>
		);
	}, [
		options,
		checked,
		showExpanded,
		limit,
		renderedShowLess,
		renderedShowMore,
		isDisabled,
	] );

	const classes = classNames(
		'wc-block-checkbox-list',
		{
			'is-loading': isLoading,
		},
		className
	);

	return (
		<ul className={ classes }>
			{ isLoading ? placeholder : renderedOptions }
		</ul>
	);
};

CheckboxList.propTypes = {
	onChange: PropTypes.func,
	options: PropTypes.arrayOf(
		PropTypes.shape( {
			key: PropTypes.string.isRequired,
			label: PropTypes.node.isRequired,
		} )
	),
	checked: PropTypes.array,
	className: PropTypes.string,
	isLoading: PropTypes.bool,
	isDisabled: PropTypes.bool,
	limit: PropTypes.number,
};

export default CheckboxList;
