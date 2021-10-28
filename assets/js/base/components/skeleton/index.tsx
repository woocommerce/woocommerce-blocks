/**
 * External dependencies
 */
import classnames from 'classnames';
import { CSSProperties, Fragment, ReactChildren } from 'react';

/**
 * Internal dependencies
 */
import './style.scss';

/**
 * Loading skeleton/placeholder element that can be used inline.
 */
export const Skeleton = ( {
	type = 'text',
	count = 1,
	inline = false,
	className: customClassName = '',
	width = '100%',
	height = 'auto',
	style = {},
	children,
}: {
	type?: 'text' | 'img';
	count?: number;
	inline?: boolean;
	className?: string;
	width?: string;
	height?: string;
	style?: CSSProperties;
	children?: ReactChildren | null;
} ): JSX.Element => {
	const className = classnames( 'loading-skeleton', customClassName );

	if ( type === 'img' ) {
		return (
			<span className={ className }>
				<img
					src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
					alt=""
					style={ { width, height, ...style } }
				/>
			</span>
		);
	}

	return (
		<>
			{ [ ...Array( count ) ].map( ( _x, i ) => (
				<Fragment key={ i }>
					<span
						key={ i }
						className={ className }
						style={ { width, height, ...style } }
					>
						{ children }&zwnj;
					</span>
					{ ! inline && <br /> }
				</Fragment>
			) ) }
		</>
	);
};

export default Skeleton;
