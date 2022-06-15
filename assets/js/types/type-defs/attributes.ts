export interface AttributeSetting {
	attribute_id: string;
	attribute_name: string;
	attribute_label: string;
	attribute_type: string;
	attribute_orderby: 'menu_order' | 'name' | 'name_num' | 'id';
	attribute_public: 0 | 1;
}

export interface AttributeObject {
	id: number;
	name: string;
	taxonomy: string;
	label: string;
}
