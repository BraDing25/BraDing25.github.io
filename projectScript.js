window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
    document.getElementById("header").style.height = "400px";
    document.getElementById("titleSection").style.top = "50%";
    document.getElementById("title").style.fontSize = "5em";
  } else {
    document.getElementById("header").style.height = "110vh";
    document.getElementById("titleSection").style.top = "25%";
    document.getElementById("title").style.fontSize = "13em";
  }
}