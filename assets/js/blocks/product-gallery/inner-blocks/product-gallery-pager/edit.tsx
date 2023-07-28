/**
 * External dependencies
 */
import { Icon } from '@wordpress/icons';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { BlockSettings } from './settings';
import { PagerDotIcon, PagerSelectedDotIcon } from './icons';
import { BlockAttributes, PagerDisplayModes } from './types';

const DigitsPager = (): JSX.Element => {
	const pagerDigitsItems = Array.from( { length: 4 }, ( _, index ) => {
		const isActive = index === 0;

		return (
			<li
				className={ `wc-block-editor-product-gallery-pager__pager-item ${
					isActive ? 'is-active' : ''
				}` }
				key={ index }
			>
				{ index + 1 }
			</li>
		);
	} );

	return (
		<ul className="wc-block-editor-product-gallery-pager__pager">
			{ pagerDigitsItems }
		</ul>
	);
};

interface DotsPagerProps {
	iconClass?: string;
}

const DotsPager = ( props: DotsPagerProps ): JSX.Element => {
	const { iconClass } = props;
	const pagerDotsItems = Array.from( { length: 3 }, ( _, index ) => {
		const icon = index === 0 ? PagerSelectedDotIcon : PagerDotIcon;

		return (
			<li key={ index }>
				<Icon className={ iconClass } icon={ icon } size={ 12 } />
			</li>
		);
	} );

	return (
		<ul className="wc-block-editor-product-gallery-pager__pager">
			{ pagerDotsItems }
		</ul>
	);
};

interface PagerProps {
	pagerDisplayMode: PagerDisplayModes;
}

const Pager = ( props: PagerProps ): JSX.Element | null => {
	const { pagerDisplayMode } = props;

	switch ( pagerDisplayMode ) {
		case PagerDisplayModes.DOTS:
			return <DotsPager />;
		case PagerDisplayModes.DIGITS:
			return <DigitsPager />;
		case PagerDisplayModes.OFF:
			return null;
		default:
			return <DotsPager />;
	}
};

interface EditProps {
	attributes: BlockAttributes;
	setAttributes: ( newAttributes: BlockAttributes ) => void;
}

export const Edit = ( props: EditProps ): JSX.Element => {
	const { attributes, setAttributes } = props;
	const blockProps = useBlockProps( {
		className: 'wc-block-editor-product-gallery-pager',
	} );

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<BlockSettings
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</InspectorControls>

			<Pager pagerDisplayMode={ attributes.pagerDisplayMode } />
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
