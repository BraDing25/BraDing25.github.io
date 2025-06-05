window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("bar").style.top = "0";
  } else {
    document.getElementById("bar").style.top = "-60px";
  }
}

document.addEventListener("DOMContentLoaded", () => {

	// Use Intersection Observer to determine if objects are within the viewport
	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) {
		  entry.target.classList.add('in-view');
		  return;
		}
	  });
	});

	// Get all the elements with the .animate class applied
	const allAnimatedElements = document.querySelectorAll('.animate');

	// Add the observer to each of those elements
	allAnimatedElements.forEach((element) => observer.observe(element));

}); 