module.exports = {
	files: [
		{
			test: './build/*.js',
			maxSize: '200 kB',
		},
		{
			test: './build/*frontend*.js',
			maxSize: '60 kB',
		},
		{
			test: './build/*.css',
			maxSize: '50kB',
		},
		{
			test: './build/vendors*.js',
			maxSize: '350 kb',
		},
	],
};
