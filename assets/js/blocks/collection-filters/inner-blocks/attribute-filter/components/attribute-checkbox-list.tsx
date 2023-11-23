/**
 * External dependencies
 */
import { CheckboxList } from '@woocommerce/blocks-components';
import { AttributeTerm } from '@woocommerce/types';

/**
 * Internal dependencies
 */
import FilterElementLabel from '~/base/components/filter-element-label';

type Props = {
	attributeTerms: AttributeTerm[];
	showCounts?: boolean;
};
export const AttributeCheckboxList = ( {
	attributeTerms,
	showCounts,
}: Props ) => (
	<CheckboxList
		className="attribute-checkbox-list"
		onChange={ () => null }
		options={ attributeTerms.map( ( term ) => ( {
			label: (
				<FilterElementLabel
					name={ term.name }
					count={ showCounts ? term.count : null }
				/>
			),
			value: term.slug,
		} ) ) }
	/>
);
