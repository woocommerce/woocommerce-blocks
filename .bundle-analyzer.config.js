module.exports = {
	files: [
		{
			test: '*.js',
			maxSize: '200 kB',
		},
		{
			test: '*frontend*.js',
			maxSize: '60 kB',
		},
		{
			test: '*.css',
			maxSize: '50kB',
		},
		{
			test: 'vendors*.js',
			maxSize: '350 kb',
		},
	],
};
