/**
 * Show text based content, limited to a number of lines, with a read more link.
 *
 * Based on https://github.com/zoltantothcom/react-clamp-lines.
 */
import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';

class ReadMore extends Component {
	constructor( props ) {
		super( ...arguments );

		this.state = {
			/**
			 * This is true when read more has been pressed and the full review is shown.
			 */
			isExpanded: false,
			/**
			 * True if we are clamping content. False if the review is short. Null during init.
			 */
			isClamped: null,
			/**
			 * Content is passed in via children.
			 */
			content: props.children,
			/**
			 * Max height for a review.
			 */
			maxHeight: 0,
		};

		this.reviewSummary = createRef();
		this.reviewContent = createRef();
		this.getButton = this.getButton.bind( this );
		this.onClick = this.onClick.bind( this );
		this.clampLines = this.clampLines.bind( this );
		this.moveMarkers = this.moveMarkers.bind( this );
	}

	componentDidMount() {
		if ( this.props.children ) {
			const { maxLines } = this.props;
			const lineHeight = this.reviewSummary.current.clientHeight + 1;
			const reviewHeight = this.reviewContent.current.clientHeight + 1;
			const maxHeight = ( lineHeight * maxLines ) + 1;

			this.setState( {
				maxHeight: maxHeight,
				isExpanded: false,
				isClamped: reviewHeight > maxHeight,
			} );
		}
	}

	componentDidUpdate( prevProps, prevState ) {
		if ( prevState.isClamped !== this.state.isClamped && this.state.isClamped ) {
			this.clampLines();
		}
	}

	/**
	 * Clamp lines calculates the height of a line of text and then limits it to the
	 * value of the lines prop. Content is updated once limited.
	 */
	clampLines() {
		const { ellipsis } = this.props;
		const { maxHeight } = this.state;
		const originalContent = this.reviewContent.current.innerHTML;

		let markers = {
			start: 0,
			middle: 0,
			end: originalContent.length,
		};

		while ( markers.start <= markers.end ) {
			markers.middle = Math.floor( ( markers.start + markers.end ) / 2 );
			this.reviewSummary.current.innerHTML = originalContent.slice( 0, markers.middle );

			if ( markers.middle === originalContent.length ) {
				this.setState( {
					isClamped: false,
				} );
				return;
			}

			markers = this.moveMarkers( maxHeight, markers );
		}

		this.reviewSummary.current.innerHTML = originalContent.slice( 0, markers.middle - 5 ) + ellipsis;
	}

	moveMarkers( maxHeight, markers ) {
		if ( this.reviewSummary.current.clientHeight <= maxHeight ) {
			markers.start = markers.middle + 1;
		} else {
			markers.end = markers.middle - 1;
		}
		return markers;
	}

	getButton() {
		const { isExpanded } = this.state;
		const { className, lessText, moreText } = this.props;

		const buttonText = isExpanded ? lessText : moreText;

		if ( ! buttonText ) {
			return;
		}

		return (
			<a
				href="#more"
				className={ className + '__read_more' }
				onClick={ this.onClick }
				aria-expanded={ ! isExpanded }
				role="button"
			>
				{ buttonText }
			</a>
		);
	}

	/**
	 * Handles the click event for the read more/less button.
	 *
	 * @param {obj} e event
	 */
	onClick( e ) {
		e.preventDefault();

		const { isExpanded } = this.state;

		this.setState( {
			isExpanded: ! isExpanded,
		} );
	}

	render() {
		const { className } = this.props;
		const { content, isClamped, isExpanded } = this.state;

		if ( ! content ) {
			return null;
		}

		if ( false === isClamped ) {
			return (
				<div className={ className }>
					<div ref={ this.reviewContent }>
						{ content }
					</div>
				</div>
			);
		}

		return (
			<div className={ className }>
				<div
					ref={ this.reviewSummary }
					aria-hidden={ isExpanded }
					style={ {
						display: isExpanded && null !== isClamped ? 'none' : 'inherit',
					} }
				>
					.
				</div>
				<div
					ref={ this.reviewContent }
					aria-hidden={ ! isExpanded }
					style={ {
						display: ! isExpanded && null !== isClamped ? 'none' : 'inherit',
					} }
				>
					{ content }
				</div>
				{ this.getButton() }
			</div>
		);
	}
}

ReadMore.propTypes = {
	children: PropTypes.node.isRequired,
	maxLines: PropTypes.number,
	ellipsis: PropTypes.string,
	moreText: PropTypes.string,
	lessText: PropTypes.string,
	className: PropTypes.string,
};

ReadMore.defaultProps = {
	maxLines: 3,
	ellipsis: '&hellip;',
	moreText: __( 'Read more', 'woo-gutenberg-products-block' ),
	lessText: __( 'Read less', 'woo-gutenberg-products-block' ),
	className: 'read-more-content',
};

export default ReadMore;
