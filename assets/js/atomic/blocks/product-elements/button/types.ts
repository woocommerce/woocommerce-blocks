interface WithClass {
	className: string;
}

interface WithStyle {
	style: Record< string, unknown >;
}

export interface BlockAttributes {
	className?: string | undefined;
	textAlign?: string | undefined;
	isDescendentOfQueryLoop?: boolean | undefined;
}

export interface AddToCartButtonPlaceholderAttributes {
	borderStyles: WithClass & WithStyle;
	colorStyles: WithClass & WithStyle;
	spacingStyles: WithStyle;
	typographyStyles: WithStyle;
}

export interface AddToCartButtonAttributes
	extends AddToCartButtonPlaceholderAttributes {
	product: {
		id: number;
		permalink: string;
		add_to_cart: {
			url: string;
			description: string;
			text: string;
		};
		has_options: boolean;
		is_purchasable: boolean;
		is_in_stock: boolean;
	};
	textAlign?: ( WithClass & WithStyle ) | undefined;
}
