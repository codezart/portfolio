// tailwind.config.js
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
	  extend: {
		keyframes: {
		  float: {
			'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
			'50%': { transform: 'translateY(-20px) translateX(10px)' },
		  },
		  floatReverse: {
			'0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
			'50%': { transform: 'translateY(15px) translateX(-15px)' },
		  }
		},
		animation: {
		  float: 'float 6s ease-in-out infinite',
		  floatReverse: 'floatReverse 7s ease-in-out infinite',
		},
	  },
	},
	plugins: [],
  };
  