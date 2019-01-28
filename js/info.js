function doScrolling(elementY, duration) {
	var startingY = window.pageYOffset,
		diff = elementY - startingY,
		start;

	// Bootstrap our animation - it will get called right before next frame shall be rendered.
	window.requestAnimationFrame(function step(timestamp) {
		if (!start) start = timestamp;

		var time = timestamp - start, // Elapsed milliseconds since start of scrolling.
			percent = Math.min(time / duration, 1); // Get percent of completion in range [0, 1].

		window.scrollTo(0, startingY + diff * percent);

		// Proceed with animation as long as we wanted it to.
		if (time < duration) {
			window.requestAnimationFrame(step);
		}
	});
}

var arrow = document.getElementById("arrow");
if( arrow ) {
	arrow.addEventListener("click", function(e) {
		e.preventDefault();
		doScrolling(window.innerHeight, 300);
	});
}

var hamburger = document.getElementById("hamburger");
if( hamburger ) {
	hamburger.addEventListener("click", function(e) {
		e.preventDefault();
		var classes = hamburger.className;

		if ( classes.indexOf( 'active' ) > -1 ) {
			hamburger.classList.remove('active');
		} else {
			hamburger.classList.add('active');
		}

	});
}

document.body.addEventListener("click", function(e) {
	var isheader = ( e.target.closest('#header')  )? true: false,
		hamClasses = ( hamburger )? hamburger.className: false;

	if ( !isheader && hamClasses ) {
		if ( hamClasses.indexOf( 'active' ) > -1 ) {
			hamburger.classList.remove('active');
		}
	}
});

var header = document.getElementById("header");

var onscroll = function() {
	var scrollTop = document.body.scrollTop,
		el = document.querySelectorAll('#about .row:not(.hero):not(.visible)');

	if( header ) {
		if( scrollTop > 100 ) {
			header.classList.add('sticky');
		} else {
			header.classList.remove('sticky');
		}
	}

	if( el.length ) {
		var windowHeight = window.innerHeight,
			windowBottom = scrollTop + windowHeight;

		for (var i = 0; i < el.length; ++i) {
			var current = el[i],
				offset = current.offsetTop + 300;

			if( offset <= windowBottom ) {
				current.className += ' visible';
			}
		}
	}
};
addEventListener('DOMContentLoaded', onscroll, false);
addEventListener('scroll', onscroll, false);













