jQuery plugin for a simple horizontal showcase
==============================================

### Licence
This jQuery plugin is licensed under the GNU Affero General Public License.
Please, read carefully: I've wrote «AFFERO». Read carefully it.
 * [GNU AGPL license](http://www.gnu.org/licenses/agpl-3.0.html) on gnu.org
 * [GNU AGPL Explained](http://www.gnu.org/licenses/why-affero-gpl.en.html) on gnu.org

### Usage
It's really simple.
```html
<!-- Importing jQuery -->
<!-- Importing this horizontal-showcase.js -->
<!-- Importing 8 CSS rules -->

<div class="showcase">
	<button class="show-back float-left">Back</button>
	<div class="show-window">
		<div class="show-container">
			<div class="show-el">Hello, world!</div>
			<div class="show-el">GNU/Linux</div>
			<div class="show-el">GNU/Hurd</div>
			<div class="show-el">Debian/Linux</div>
			<div class="show-el">Debian/Hurd</div>
		</div>
	</div>
	<button class="show-forward float-left">Forward</button>
</div>

<script>
$(document).ready(function() {
	$(".showcase").horizontalShowcase();
});
</script>
```

Lot of options as (they are not all):
```javascript
$(".showcase").horizontalShowcase({
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
});
```

### The CSS
Really, see the file. There are 8 CSS rules.

### Credits.
Thanks to http://jsfiddle.net/JQZ29/24/ for little clarifications.
