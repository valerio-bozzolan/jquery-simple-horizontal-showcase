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
 *   along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function ( $ ) {
	$.fn.horizontalShowcase = function( options ) {
		var opts = $.extend( {}, $.fn.horizontalShowcase.defaults, options );

		var $showcase = this;

		// Specified element's width
		var $els = this.find(opts.elSelector);
		opts.elSpace = opts.elSpace || opts.elSpaceRight + opts.elSpaceLeft;
		opts.elSize = (opts.elSize || $els.first().width()) + opts.elSpace;
		$els.width(opts.elSize);

		opts.step = opts.step || opts.windowEls;

		// Specified window's width
		opts.windowSize = opts.windowSize || opts.windowEls * opts.elSize;
		this.find(opts.windowSelector).width(opts.windowSize);

		// Calculated container's width
		var $container = this.find(opts.containerSelector);
		var containerWidth = $els.length * opts.elSize;
		$container.width(containerWidth);
		console.log($container);

		// Calculated scroll limit (when you can see the last part of the container and it can turn around)
		var slideLimit = opts.windowSize - containerWidth;

		var $btnBack = this.find(opts.btnBackSelector);
		$btnBack.click(function(event) {
			restartInterval();

			var x = $container.position();
			var y = x.left;
			var yy = y + opts.elSize * opts.step;

			if(opts.preventDefault) {
				event.preventDefault();
			}

			if(y >= 0 || opts.__animating === true) {
				return;
			}

			opts.__animating = true;
			opts.click.call(this, $showcase);
				$container.animate({left: yy}, opts.delay, function() {
				opts.__animating = false;
				opts.done.call($btnBack, $showcase);
			});
		});

		var $btnForward = this.find(opts.btnForwardSelector);
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
		    var yy = y - opts.elSize * opts.step;
		    var turnAround = y <= slideLimit;
		    var value = (turnAround) ? 0 : yy;

		    if(opts.preventDefault) {
			event.preventDefault();
		    }

		    if(turnAround && opts.oveflow === false || opts.__animating === true) {
			return;
		    }

		    opts.__animating = true;
		    opts.click.call(this, $showcase);
		    $container.animate({left: value}, (turnAround) ? opts.overflowDelay : opts.delay, function() {
			opts.__animating = false;
			opts.done.call($btnForward, $showcase);
		    });
		});

		restartInterval();

		return this;
	};
	$.fn.horizontalShowcase.defaults = {
		elSelector: ".show-el",
		containerSelector: ".show-container",
		windowSelector: ".show-window",
		btnBackSelector: ".show-back",
		btnForwardSelector: ".show-forward",
		preventDefault: false, /* prevent events after clicking on the link|button */
		preventFlood: true, /* prevent click during existing animation */
		click: function(orizhontalShowcase) { /* fired when clicking on a button */
		    // $(this) is the button
		},
		done: function(orizhontalShowcase) { /* fired when animation ends */
		    // $(this) is the button
		},
		elSize: 400, /* element width */
		elSpaceLeft: 0, /* manually insert this sum: border-left + padding-left */
		elSpaceRight: 0, /* manually insert this sum: border-right + padding-right */
		elSpace: undefined, /* manually insert this sum: border-left + padding-left + border-right + padding-right (this override the above options) */
		delay: 200, /* scroll animation */
		overflow: true, /* enable turn around */
		overflowDelay: 500, /* turn around scroll animation */
		step: undefined, /* how many elements to scroll (ca be float) */
		interval: undefined, /* set an interval in ms */
		windowSize: undefined, /* window size specified in px */
		windowEls: 1 /* window size specified in n° of elements (this override the above option) */
	};
}( jQuery ));
