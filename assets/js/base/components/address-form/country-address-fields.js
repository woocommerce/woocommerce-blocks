/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';

const postcodeBeforeCity = {
	city: {
		index: 9,
	},
	postcode: {
		index: 7,
	},
};

const optionalState = {
	state: {
		required: false,
	},
};

const hiddenPostcode = {
	postcode: {
		required: false,
		hidden: true,
	},
};

const countryAddressFields = {
	AE: {
		...hiddenPostcode,
		...optionalState,
	},
	AF: optionalState,
	AO: {
		...hiddenPostcode,
		state: {
			label: __( 'Province', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Province (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	AT: {
		...postcodeBeforeCity,
		...optionalState,
	},
	AU: {
		city: {
			label: __( 'Suburb', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Suburb (optional)',
				'woo-gutenberg-products-block'
			),
		},
		postcode: {
			label: __( 'Postcode', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Postcode (optional)',
				'woo-gutenberg-products-block'
			),
		},
		state: {
			label: __( 'State', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'State (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	AX: {
		...postcodeBeforeCity,
		...optionalState,
	},
	BD: {
		postcode: {
			required: false,
		},
		state: {
			label: __( 'District', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'District (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	BE: {
		...postcodeBeforeCity,
		state: {
			label: __( 'Province', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Province (optional)',
				'woo-gutenberg-products-block'
			),
			required: false,
		},
	},
	BH: {
		postcode: {
			required: false,
		},
		...optionalState,
	},
	BI: optionalState,
	BO: hiddenPostcode,
	BS: hiddenPostcode,
	CA: {
		state: {
			label: __( 'Province', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Province (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	CH: {
		...postcodeBeforeCity,
		state: {
			label: __( 'Canton', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Canton (optional)',
				'woo-gutenberg-products-block'
			),
			required: false,
		},
	},
	CL: {
		city: {
			require: true,
		},
		postcode: {
			required: false,
		},
		state: {
			label: __( 'Region', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Region (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	CN: {
		state: {
			label: __( 'Province', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Province (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	CO: {
		postcode: {
			required: false,
		},
	},
	CZ: optionalState,
	DE: {
		...postcodeBeforeCity,
		...optionalState,
	},
	DK: {
		...postcodeBeforeCity,
		...optionalState,
	},
	EE: {
		...postcodeBeforeCity,
		...optionalState,
	},
	ES: {
		...postcodeBeforeCity,
		state: {
			label: __( 'State', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'State (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	FI: {
		...postcodeBeforeCity,
		...optionalState,
	},
	FR: {
		...postcodeBeforeCity,
		...optionalState,
	},
	GB: {
		postcode: {
			label: __( 'Postcode', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Postcode (optional)',
				'woo-gutenberg-products-block'
			),
		},
		state: {
			label: __( 'County', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'County (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	GP: optionalState,
	GF: optionalState,
	GR: optionalState,
	HK: {
		postcode: {
			required: false,
		},
		city: {
			label: __( 'Town/District', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Town/District (optional)',
				'woo-gutenberg-products-block'
			),
		},
		state: {
			label: __( 'Region', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Region (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	HU: {
		state: {
			label: __( 'County', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'County (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	ID: {
		state: {
			label: __( 'Province', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Province (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	IE: {
		postcode: {
			label: __( 'Eircode', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Eircode (optional)',
				'woo-gutenberg-products-block'
			),
			required: false,
		},
		state: {
			label: __( 'County', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'County (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	IS: {
		...postcodeBeforeCity,
		...optionalState,
	},
	IL: {
		...postcodeBeforeCity,
		...optionalState,
	},
	IM: optionalState,
	IT: {
		...postcodeBeforeCity,
		state: {
			label: __( 'Province', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Province (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	JP: {
		first_name: {
			index: 2,
		},
		last_name: {
			index: 1,
		},
		address_1: {
			index: 7,
		},
		address_2: {
			index: 8,
		},
		postcode: {
			index: 4,
		},
		city: {
			index: 6,
		},
		state: {
			label: __( 'Prefecture', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Prefecture (optional)',
				'woo-gutenberg-products-block'
			),
			index: 5,
		},
	},
	KR: optionalState,
	KW: optionalState,
	LV: {
		state: {
			label: __( 'Municipality', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Municipality (optional)',
				'woo-gutenberg-products-block'
			),
			required: false,
		},
	},
	LB: optionalState,
	MQ: optionalState,
	MT: optionalState,
	MZ: {
		...hiddenPostcode,
		state: {
			label: __( 'Province', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Province (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	NL: {
		...postcodeBeforeCity,
		state: {
			label: __( 'Province', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Province (optional)',
				'woo-gutenberg-products-block'
			),
			required: false,
		},
	},
	NG: {
		...hiddenPostcode,
		state: {
			label: __( 'State', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'State (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	NZ: {
		postcode: {
			label: __( 'Postcode', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Postcode (optional)',
				'woo-gutenberg-products-block'
			),
		},
		state: {
			label: __( 'Region', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Region (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	NO: {
		...postcodeBeforeCity,
		...optionalState,
	},
	NP: {
		postcode: {
			required: false,
		},
		state: {
			label: __( 'State', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'State (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	PL: {
		...postcodeBeforeCity,
		...optionalState,
	},
	PT: optionalState,
	RE: optionalState,
	RO: {
		state: {
			label: __( 'County', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'County (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	RS: {
		state: {
			required: false,
			hidden: true,
		},
	},
	SE: {
		...postcodeBeforeCity,
		...optionalState,
	},
	SG: {
		city: {
			required: false,
		},
		state: {
			required: false,
		},
	},
	SK: {
		...postcodeBeforeCity,
		...optionalState,
	},
	SI: {
		...postcodeBeforeCity,
		...optionalState,
	},
	SR: {
		...hiddenPostcode,
	},
	ST: {
		...hiddenPostcode,
		state: {
			label: __( 'District', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'District (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	LI: {
		...postcodeBeforeCity,
		state: {
			label: __( 'Municipality', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Municipality (optional)',
				'woo-gutenberg-products-block'
			),
			required: false,
		},
	},
	LK: optionalState,
	LU: optionalState,
	MD: {
		state: {
			label: __(
				'Municipality/District',
				'woo-gutenberg-products-block'
			),
			optionalLabel: __(
				'Municipality/District (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	TR: {
		...postcodeBeforeCity,
		state: {
			label: __( 'Province', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Province (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	UG: {
		...hiddenPostcode,
		city: {
			label: __( 'Town/Village', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Town/Village (optional)',
				'woo-gutenberg-products-block'
			),
		},
		state: {
			label: __( 'District', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'District (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	US: {
		postcode: {
			label: __( 'ZIP', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'ZIP (optional)',
				'woo-gutenberg-products-block'
			),
		},
		state: {
			label: __( 'State', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'State (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	VN: {
		city: {
			index: 8,
		},
		postcode: {
			index: 7,
			required: false,
		},
		state: {
			required: false,
			hidden: true,
		},
	},
	WS: hiddenPostcode,
	YT: optionalState,
	ZA: {
		state: {
			label: __( 'Province', 'woo-gutenberg-products-block' ),
			optionalLabel: __(
				'Province (optional)',
				'woo-gutenberg-products-block'
			),
		},
	},
	ZW: hiddenPostcode,
};

export default countryAddressFields;
