/**
 * External dependencies
 */
import { Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { PagerDotIcon, PagerSelectedDotIcon } from './icons';

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
	const pagerDotsItems = Array.from( { length: 4 }, ( _, index ) => {
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

export const Edit = (): JSX.Element => {
	const blockProps = useBlockProps( {
		className: 'wc-block-editor-product-gallery-pager',
	} );

	return (
		<div { ...blockProps }>
			<DotsPager />

			{ /* <DigitsPager /> */ }
		</div>
	);
};

export const Save = (): JSX.Element => {
	return <div { ...useBlockProps.save() }></div>;
};
