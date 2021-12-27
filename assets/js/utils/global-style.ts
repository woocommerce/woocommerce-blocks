type ClassAndStyle = {
	class: string | null;
	style: string | null;
};

const parseDataStyleFromDataset = ( element: HTMLElement ) => {
	const style = element.dataset.style;

	if ( ! style ) {
		return null;
	}

	try {
		return JSON.parse( style );
	} catch ( error ) {
		// Should I add a log here?
		return null;
	}
};

export const getClassAndStyleTextColorFromDataset = (
	el: HTMLElement
): ClassAndStyle => ( {
	class: el.dataset?.colorText || null,
	style: parseDataStyleFromDataset( el ).color.text,
} );
