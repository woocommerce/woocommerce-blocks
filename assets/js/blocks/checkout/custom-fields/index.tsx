const CustomFields = ( {
	block,
}: {
	// Name of the parent block.
	block: string;
} ): JSX.Element => {
	return (
		<div className="wc-block-checkout__custom_fields">
			{ block === 'shipping' ? 'Shipping' : 'Not shipping' }
		</div>
	);
};

export default CustomFields;
