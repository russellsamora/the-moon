'use strict';
(function() {
	var _palettes = [
		['rgb(240,236,175)', 'rgb(237,195,116)', 'rgb(218,240,223)', 'rgb(133,184,161)', 'rgb(179,219,191)', 'rgb(101,145,142)'],
		['rgb(206,209,201)', 'rgb(237,217,190)', 'rgb(69,69,62)', 'rgb(143,185,196)', 'rgb(64,47,61)', 'rgb(209,102,92)'],
		['rgb(204,207,163)', 'rgb(247,231,217)', 'rgb(74,79,62)', 'rgb(114,120,103)','rgb(227,78,68)','rgb(250,192,185)']
	];
	
	var _numFloaters = Math.floor(Math.max(7, Math.random() * 14));
	var _currentPalette = Math.floor(Math.random() * _palettes.length);

	var _moon = document.getElementsByClassName('moon')[0];
	var _moonWidth = _moon.offsetWidth;

	var _prefix;
	
	var init = function() {
		setupPrefix();
		setupMoon();
	};

	var setupPrefix = function() {
		var agent = navigator.userAgent.toLowerCase();
		if(agent.match(/firefox/g)) {
			_prefix = '-moz-';
		} else if(agent.match(/safari|chrome/g)) {
			_prefix = '-webkit-';
		} else {
			_prefix = '';
		}
	};
		
	var setupMoon = function() {
		var palette = _palettes[_currentPalette];
		var index = 0;
		var sheet = document.styleSheets[0];

		_moon.style.backgroundColor = palette[Math.floor(Math.random() * palette.length)];

		while(index < _numFloaters) {
			var name = 'floater' + index;
			
			var el = createAnimation({
				sheet: sheet,
				name: name,
				palette: palette,
				index: index
			});
			
			_moon.appendChild(el);
			index++;
		}
	};


	// helper functions
	var randomTranslate = function() {
		return Math.floor(Math.random() * 100 - 50) + '%';
	};

	var randomRotate = function() {
		return Math.floor(Math.random() * 360);
	};

	var createAnimation = function(params) {
		var prefixes = ['-moz-', '-webkit-', ''];
		var minWidth = Math.floor(_moonWidth / 3);
		var rule = '';

		var duration = Math.floor(Math.max(25, Math.random() * 40)) + 's';
		var color = params.palette[Math.floor(Math.random() * params.palette.length)];

		var el = document.createElement('span');

		if (el.classList) {
			el.classList.add('moon--floater');
			el.classList.add(params.name);
		} else {
			el.name += ' moon--floater ' + params.name;
		}

		var rFrom = randomRotate();
		var rTo = rFrom + Math.floor((Math.random() * 30) * (Math.random() < 0.5 ? 1 : -1));
		rFrom += 'deg';
		rTo += 'deg';

		el.style.animationName = params.name;
		el.style.animationDuration = duration;
		el.style.backgroundColor = color;
		el.style.width = Math.floor(Math.max(minWidth, Math.random() * _moonWidth * 2)) + 'px';
		el.style.height = Math.floor(Math.max(minWidth, Math.random() * _moonWidth * 2)) + 'px';
		el.style.opacity = Math.min(Math.max(0.2, Math.random()), 0.5);
		el.style.transform = 'rotate(' + rFrom + ')';

		var keyframes = {
			x: {from: randomTranslate(), to: randomTranslate()},
			y: {from: randomTranslate(), to: randomTranslate()},
			r: {from: rFrom, to: rTo}
		};

		console.log(keyframes);
		rule = '';
		rule += '@' + _prefix + 'keyframes ' + params.name + ' {';
		rule += '0% { ' + _prefix + 'transform: translate(' + keyframes.x.from + ',' + keyframes.y.from + ') rotate(' + keyframes.r.from + '); }';
		rule += '100% { ' + +_prefix + 'transform: translate(' + keyframes.x.to + ',' + keyframes.y.to + ') rotate(' + keyframes.r.to + '); }';
		rule += '}';

		params.sheet.insertRule(rule, 0);

		return el;
	};

	init();
})();