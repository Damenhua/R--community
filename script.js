const form = document.querySelector(".fact-form");
const btnShare = document.querySelector(".share");
const btnPost = form.querySelector(".post");

btnShare.addEventListener("click", function () {
  form.classList.toggle("hidden");
  const text = form.classList.contains("hidden")
    ? "Share your thoughts"
    : "Close";
  btnShare.textContent = text;
});

btnPost.addEventListener("click", function (e) {
  e.preventDefault();
});
