/**
 * External dependencies
 */
import FilterElementLabel from '@woocommerce/base-components/filter-element-label';
import { CheckboxList } from '@woocommerce/blocks-components';
import { AttributeTerm } from '@woocommerce/types';

type Props = {
	attributeTerms: AttributeTerm[];
};
export const AttributeCheckboxList = ( { attributeTerms }: Props ) => (
	<CheckboxList
		className="attribute-checkbox-list"
		onChange={ () => null }
		options={ attributeTerms.map( ( term ) => ( {
			label: (
				<FilterElementLabel name={ term.name } count={ term.count } />
			),
			value: term.slug,
		} ) ) }
	/>
);
