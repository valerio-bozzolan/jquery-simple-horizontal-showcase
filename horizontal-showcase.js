/*
 * jQuery Simple Horizontal Showcase
 * Copyright (C) 2015 Valerio Bozzolan
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function ( $ ) {
	$.fn.horizontalShowcase = function( options ) {
		var opts = $.extend( {}, $.fn.horizontalShowcase.defaults, options );

		return this.each(function() {
			var $showcase = $(this);

			// Specified element's width
			var $els = $(this).find(opts.elSelector);
			$els.width(opts.elWidth);
			opts.elWidth = opts.elWidth + opts.elInterWidth; // We formally think that the element is even with padding and border
			if(!opts.elHeight) {
				var maxVal = -1;
				$els.each(function() {
					var h = $(this).height();
					maxVal = h > maxVal ? h : maxVal;
				});
				opts.elHeight = maxVal;
			}
			$els.height(opts.elHeight);

			opts.step = opts.step || opts.els;

			// Specified window's width
			opts.width = opts.width || opts.els * opts.elWidth;
			$(this).find(opts.windowSelector).width(opts.width).height(opts.elHeight + opts.elInterHeight); // We formally think that the window is even with padding and borders of the elements

			// Calculated container's width
			var $container = $(this).find(opts.containerSelector);
			var containerWidth = $els.length * opts.elWidth;
			$container.width(containerWidth);

			// Calculated scroll limit (when you can see the last part of the container and it can turn around)
			var slideLimit = opts.width - containerWidth;

			var $btnBack = $(this).find(opts.actionBackSelector);
			$btnBack.click(function(event) {
				restartInterval();

				var x = $container.position();
				var y = x.left;
				var yy = y + opts.elWidth * opts.step;

				if(opts.preventDefault) {
					event.preventDefault();
				}

				if(y >= 0 || opts.__animating === true) {
					return;
				}

				opts.__animating = true;
				opts.click.call($(this), $showcase);
				$container.animate({left: yy}, opts.delay, function() {
					opts.__animating = false;
					opts.done.call($btnBack, $showcase);
				});
			});

			var $btnForward = $(this).find(opts.actionForwardSelector);
			var restartInterval = function() {
				if(opts.interval) {
					if(opts.__intervalID) {
						clearInterval(opts.__intervalID);
					}
					opts.__intervalID = setInterval(function() {
						$btnForward.click();
					}, opts.interval);
				}
			};
			$btnForward.click(function(event) {
				restartInterval();

				var x = $container.position();
				var y = x.left;
				var yy = y - opts.elWidth * opts.step;
				var turnAround = y <= slideLimit;
				var value = (turnAround) ? 0 : yy;

				if(opts.preventDefault) {
					event.preventDefault();
				}

				if(turnAround && opts.oveflow === false || opts.__animating === true) {
					return;
				}

				opts.__animating = true;
				opts.click.call($(this), $showcase);
				$container.animate({left: value}, (turnAround) ? opts.overflowDelay : opts.delay, function() {
					opts.__animating = false;
					opts.done.call($btnForward, $showcase);
				});
			});

			restartInterval();
		});
	};
	$.fn.horizontalShowcase.defaults = {
		els: 1,
		step: undefined,
		width: undefined,
		elWidth: 250,
		elHeight: undefined,
		elInterWidth: 0,
		elInterHeight: 0,
		delay: 200,
		overflow: true,
		overflowDelay: 500,
		interval: undefined,
		click: function(orizhontalShowcase) {},
		done: function(orizhontalShowcase) {},
		preventDefault: false,
		preventFlood: true,
		windowSelector: ".show-window",
		containerSelector: ".show-container",
		elSelector: ".show-el",
		actionBackSelector: ".show-back",
		actionForwardSelector: ".show-forward"
	};
}( jQuery ));
