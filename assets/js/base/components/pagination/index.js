/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Label from '@woocommerce/base-components/label';

/**
 * Internal dependencies
 */
import { getIndexes } from './utils.js';
import './style.scss';

const Pagination = ( {
	currentPage,
	displayFirstAndLastPages,
	displayNextAndPreviousArrows,
	pagesToDisplay,
	onPageChange,
	totalPages,
} ) => {
	let { minIndex, maxIndex } = getIndexes(
		pagesToDisplay,
		currentPage,
		totalPages
	);
	const showFirstPage = displayFirstAndLastPages && Boolean( minIndex !== 1 );
	const showLastPage =
		displayFirstAndLastPages && Boolean( maxIndex !== totalPages );
	const showFirstPageEllipsis =
		displayFirstAndLastPages && Boolean( minIndex > 3 );
	const showLastPageEllipsis =
		displayFirstAndLastPages && Boolean( maxIndex < totalPages - 2 );

	// Handle the cases where there would be an ellipsis replacing one single page
	if ( showFirstPage && minIndex === 3 ) {
		minIndex = minIndex - 1;
	}
	if ( showLastPage && maxIndex === totalPages - 2 ) {
		maxIndex = maxIndex + 1;
	}

	const pages = [];
	if ( minIndex && maxIndex ) {
		for ( let i = minIndex; i <= maxIndex; i++ ) {
			pages.push( i );
		}
	}

	return (
		<div className="wc-block-pagination">
			<Label
				screenReaderLabel={ __(
					'Navigate to another page',
					'woo-gutenberg-products-block'
				) }
			/>
			{ displayNextAndPreviousArrows && (
				<button
					className="wc-block-pagination-page"
					onClick={ () => onPageChange( currentPage - 1 ) }
					title={ __(
						'Previous page',
						'woo-gutenberg-products-block'
					) }
					disabled={ currentPage <= 1 }
				>
					<Label
						label="<"
						screenReaderLabel={ __(
							'Previous page',
							'woo-gutenberg-products-block'
						) }
					/>
				</button>
			) }
			{ showFirstPage && (
				<button
					className={ classNames( 'wc-block-pagination-page', {
						'wc-block-pagination-page--active': currentPage === 1,
					} ) }
					onClick={ () => onPageChange( 1 ) }
					disabled={ currentPage === 1 }
				>
					1
				</button>
			) }
			{ showFirstPageEllipsis && (
				<span
					className="wc-block-pagination-ellipsis"
					aria-hidden="true"
				>
					{ __( '…', 'woo-gutenberg-products-block' ) }
				</span>
			) }
			{ pages.map( ( page ) => {
				return (
					<button
						key={ page }
						className={ classNames( 'wc-block-pagination-page', {
							'wc-block-pagination-page--active':
								currentPage === page,
						} ) }
						onClick={
							currentPage === page
								? null
								: () => onPageChange( page )
						}
						disabled={ currentPage === page }
					>
						{ page }
					</button>
				);
			} ) }
			{ showLastPageEllipsis && (
				<span
					className="wc-block-pagination-ellipsis"
					aria-hidden="true"
				>
					{ __( '…', 'woo-gutenberg-products-block' ) }
				</span>
			) }
			{ showLastPage && (
				<button
					className={ classNames( 'wc-block-pagination-page', {
						'wc-block-pagination-page--active':
							currentPage === totalPages,
					} ) }
					onClick={ () => onPageChange( totalPages ) }
					disabled={ currentPage === totalPages }
				>
					{ totalPages }
				</button>
			) }
			{ displayNextAndPreviousArrows && (
				<button
					className="wc-block-pagination-page"
					onClick={ () => onPageChange( currentPage + 1 ) }
					title={ __( 'Next page', 'woo-gutenberg-products-block' ) }
					disabled={ currentPage >= totalPages }
				>
					<Label
						label=">"
						screenReaderLabel={ __(
							'Next page',
							'woo-gutenberg-products-block'
						) }
					/>
				</button>
			) }
		</div>
	);
};

Pagination.propTypes = {
	/**
	 * Number of the page currently being displayed.
	 */
	currentPage: PropTypes.number.isRequired,
	/**
	 * Total number of pages.
	 */
	totalPages: PropTypes.number.isRequired,
	/**
	 * Displays first and last pages if they are not in the current range of pages displayed.
	 */
	displayFirstAndLastPages: PropTypes.bool,
	/**
	 * Displays arrows to navigate to the previous and next pages.
	 */
	displayNextAndPreviousArrows: PropTypes.bool,
	/**
	 * Callback function called when the user triggers a page change.
	 */
	onPageChange: PropTypes.func,
	/**
	 * Number of pages to display at the same time, including the active page
	 * and the pages displayed before and after it. It doesn't include the first
	 * and last pages.
	 */
	pagesToDisplay: PropTypes.number,
};

Pagination.defaultProps = {
	displayFirstAndLastPages: true,
	displayNextAndPreviousArrows: true,
	pagesToDisplay: 3,
};

export default Pagination;
