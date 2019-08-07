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
			isExpanded: true,
			isClamped: false,
			content: '.',
		};

		this.lineHeight = 0;
		this.start = 0;
		this.middle = 0;
		this.end = 0;
		this.originalContent = 1 === React.Children.count( props.children ) ? props.children : props.children.join( '' );

		this.element = createRef();
		this.getButton = this.getButton.bind( this );
		this.onClick = this.onClick.bind( this );
		this.clampLines = this.clampLines.bind( this );
		this.moveMarkers = this.moveMarkers.bind( this );
	}

	componentDidMount() {
		if ( this.props.children ) {
			this.lineHeight = this.element.current.clientHeight + 1;
			this.clampLines();
		}
	}

	/**
	 * Clamp lines calculates the height of a line of text and then limits it to the
	 * value of the lines prop. Content is updated once limited.
	 */
	clampLines() {
		const { ellipsis, maxLines } = this.props;
		const maxHeight = ( this.lineHeight * maxLines ) + 1;

		this.start = 0;
		this.middle = 0;
		this.end = this.originalContent.length;

		while ( this.start <= this.end ) {
			this.middle = Math.floor( ( this.start + this.end ) / 2 );
			this.element.current.innerHTML = this.originalContent.slice( 0, this.middle );

			if ( this.middle === this.originalContent.length ) {
				this.setState( {
					content: this.originalContent,
					isClamped: false,
				} );
				return;
			}

			this.moveMarkers( maxHeight );
		}

		this.element.current.innerHTML = this.originalContent.slice( 0, this.middle - 5 ) + ellipsis;

		this.setState( {
			content: this.originalContent.slice( 0, this.middle - 5 ) + ellipsis,
			isExpanded: false,
			isClamped: true,
		} );
	}

	moveMarkers( maxHeight ) {
		if ( this.element.current.clientHeight <= maxHeight ) {
			this.start = this.middle + 1;
		} else {
			this.end = this.middle - 1;
		}
	}

	getButton() {
		const { isExpanded, isClamped } = this.state;
		const { className, lessText, moreText } = this.props;

		const buttonText = isExpanded ? lessText : moreText;

		if ( ! buttonText || ! isClamped ) {
			return;
		}

		return (
			<a
				href="#more"
				className={ className + '__read_more' }
				onClick={ this.onClick }
				aria-expanded={ ! isExpanded }
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
		const { isExpanded } = this.state;

		e.preventDefault();

		if ( isExpanded ) {
			this.clampLines();
		} else {
			this.setState( {
				content: this.originalContent,
				isExpanded: ! isExpanded,
			} );
		}
	}

	render() {
		const { className } = this.props;
		const { content } = this.state;

		if ( ! content ) {
			return null;
		}

		return (
			<div className={ className }>
				<div
					ref={ this.element }
					dangerouslySetInnerHTML={ {
						// You must ensure HTML content is safe for direct rendering.
						__html: content,
					} }
				/>
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
