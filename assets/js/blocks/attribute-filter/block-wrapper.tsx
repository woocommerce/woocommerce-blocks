/**
 * Internal dependencies
 */
import metadata from './block.json';
import Block from './block';

const BlockWrapper = ( props: Record< string, unknown > ) => {
	const attributes = {
		className: props?.className || '',
		attributeId: props?.attributeId ? parseInt( props.attributeId, 10 ) : 0,
		showCounts: props?.showCounts || metadata.attributes.showCounts.default,
		queryType: props?.queryType || metadata.attributes.queryType.default,
		heading: '',
		headingLevel:
			props?.headingLevel || metadata.attributes.headingLevel.default,
		displayStyle:
			props?.displayStyle || metadata.attributes.displayStyle.default,
		showFilterButton:
			props?.showFilterButton ||
			metadata.attributes.showFilterButton.default,
		selectType: props?.selectType || metadata.attributes.selectType.default,
		isPreview: false,
	};

	return <Block isEditor={ false } attributes={ attributes } />;
};

export default BlockWrapper;
