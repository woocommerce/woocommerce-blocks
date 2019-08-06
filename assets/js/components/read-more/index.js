/**
 * Show text based content, limited to a number of lines, with a read more link.
 *
 * Based on https://github.com/zoltantothcom/react-clamp-lines.
 */
import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';

class ReadMore extends Component {
	constructor( props ) {
		super( ...arguments );
		this.start = 0;
		this.middle = 0;
		this.end = 0;
		this.original = props.content;
		this.state = {
			expanded: true,
			noClamp: false,
			content: props.content.substring( 0, 20 ),
		};

		this.element = createRef();
		this.getButton = this.getButton.bind( this );
		this.onClick = this.onClick.bind( this );
		this.clampLines = this.clampLines.bind( this );
		this.moveMarkers = this.moveMarkers.bind( this );
		this.getEllipsis = this.getEllipsis.bind( this );
	}

	componentDidMount() {
		if ( this.props.content ) {
			this.clampLines();
		}
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.content !== this.props.content ) {
			this.original = this.props.content;
			this.clampLines();
		}
	}

	clampLines() {
		if ( ! this.element ) {
			return;
		}

		// Limit length to get lineHeight.
		this.element.current.innerHTML = this.original.substring( 0, 20 );

		const lineHeight = this.element.current.clientHeight + 1;
		const maxHeight = ( lineHeight * this.props.lines ) + 1;

		this.start = 0;
		this.middle = 0;
		this.end = this.original.length;

		while ( this.start <= this.end ) {
			this.middle = Math.floor( ( this.start + this.end ) / 2 );
			this.element.current.innerHTML = this.original.slice( 0, this.middle );

			if ( this.middle === this.original.length ) {
				this.setState( {
					content: this.original,
					noClamp: true,
				} );
				return;
			}

			this.moveMarkers( maxHeight );
		}

		this.element.current.innerHTML = this.original.slice( 0, this.middle - 5 ) + this.getEllipsis();

		this.setState( {
			content: this.original.slice( 0, this.middle - 5 ) + this.getEllipsis(),
			expanded: false,
		} );
	}

	moveMarkers( maxHeight ) {
		if ( this.element.current.clientHeight <= maxHeight ) {
			this.start = this.middle + 1;
		} else {
			this.end = this.middle - 1;
		}
	}

	getEllipsis() {
		return this.state.noClamp ? '' : this.props.ellipsis;
	}

	getButton() {
		const { expanded } = this.state;
		const { className, lessText, moreText } = this.props;

		const buttonText = expanded ? lessText : moreText;

		if ( ! buttonText ) {
			return;
		}

		return (
			<a
				href="#more"
				className={ className + '__read_more' }
				onClick={ this.onClick }
				aria-expanded={ ! expanded }
			>
				{ buttonText }
			</a>
		);
	}

	onClick( e ) {
		const { expanded } = this.state;

		e.preventDefault();

		if ( expanded ) {
			this.clampLines();
		} else {
			this.setState( {
				content: this.original,
			} );
		}

		this.setState( { expanded: ! this.state.expanded } );
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
				{ ! this.state.noClamp && this.getButton() }
			</div>
		);
	}
}

ReadMore.propTypes = {
	content: PropTypes.string.isRequired,
	lines: PropTypes.number,
	ellipsis: PropTypes.string,
	moreText: PropTypes.string,
	lessText: PropTypes.string,
	className: PropTypes.string,
};

ReadMore.defaultProps = {
	content: '',
	lines: 3,
	ellipsis: '...',
	moreText: 'Read more',
	lessText: 'Read less',
	className: '',
};

export default ReadMore;
