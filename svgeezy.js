/*
 * SVGeezy.js
 *
 * Copyright 2016, Ben Howdle http://benhowdle.im
 *
 * Date: Sun Aug 26 20:38 2012 GMT
 */

/*
	//call like so, pass in a class name that you don't want it to check and a filetype to replace .svg with
	svgeezy.init('nocheck', 'png');
*/

window.svgeezy = function() {

	function hasClass(element, cls) {
		return element.classList.contains(cls)
	}

	function isSvg(src) {
		return src && src.split('.').pop().split('?')[0] == 'svg';
	}

	function supportsSvg() {
		return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
	}

	return {
		init: function (avoid, filetype, forceFallbackAlways) {
			filetype = filetype || 'png';
			
			if (forceFallbackAlways || !supportsSvg()) {
				document.getElementsByTagName('img')
					.forEach(function (image) {
						if (image && (!avoid || !hasClass(image, avoid))) {
							var src = image.getAttribute('src');
							
							if (isSvg(src)) {
								var newSrc = src.replace('.svg', '.' + filetype);
								image.setAttribute('src', newSrc);
							}
						}
					})
			}
		}
	};

}();
