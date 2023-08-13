var mobileNav = document.querySelector(".mobile-nav");
var hamberger = document.querySelector(".toggle-button");
var backdrop = document.querySelector(".backdrop");

hamberger.addEventListener("click", function () {
    backdrop.classList.add('open');
    mobileNav.classList.add('open');
});

backdrop.addEventListener("click", function(){
    mobileNav.classList.remove('open');
    backdrop.classList.remove('open');
})
