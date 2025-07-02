let slideIndex = 0;

const slides  = () => document.getElementsByClassName("image-sliderfade");
const controlsBar = () => document.querySelector('.controls-bar');
const indexEl = () => document.querySelector('.slide-index');

function showSlides() {
  const s = slides();
  for (let i = 0; i < s.length; i++) {
    s[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > s.length) slideIndex = 1;

  s[slideIndex - 1].style.display = "block";
  updateIndex();
}

function plusSlides(n) {
  slideIndex += n - 1; // porque showSlides faz +1
  if (slideIndex < 0) slideIndex = slides().length - 1;
  showSlides();
}

function updateIndex() {
  const total = slides().length;
  indexEl().textContent = `${slideIndex}/${total}`;
}

// *Substitua* document.addEventListener por document$.subscribe
document$.subscribe(() => {
  slideIndex = 0;
  showSlides();
});
