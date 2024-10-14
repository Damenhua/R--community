const form = document.querySelector(".fact-form");
const btnShare = document.querySelector(".share");
const btnPost = form.querySelector(".post");
const factsList = document.querySelector(".facts-list");

// Creat DOM elements: Render facts in list
factsList.innerHTML = "";

// Load data from Supabase
loadFacts();

async function loadFacts() {
  try {
    const res = await fetch(
      "https://myloaluksbolqidlcybk.supabase.co/rest/v1/fact-contents",
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bG9hbHVrc2JvbHFpZGxjeWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MjM2MTUsImV4cCI6MjA0NDE5OTYxNX0.7ARBG8gJZuOBjY620Nv4VhICvzzpjrbLmsCmYEOS_5Q",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im15bG9hbHVrc2JvbHFpZGxjeWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg2MjM2MTUsImV4cCI6MjA0NDE5OTYxNX0.7ARBG8gJZuOBjY620Nv4VhICvzzpjrbLmsCmYEOS_5Q",
        },
      }
    );
    const data = await res.json();
    renderFacts(data);
  } catch (err) {
    console.error(err);
  }
}

function renderFacts(dataArray) {
  const htmlArray = dataArray.map(
    (fact) => `<li class="fact-content">
    <p>
    ${fact.text}
      <a
      class="source"
      href="${fact.source}"
      target="_blank"
      >(source)</a>
              </p>
              <span class="tag"style="background-color: #d97706"
                >#${fact.category}#</span
              >
              </li>
              `
  );
  factsList.insertAdjacentHTML("afterbegin", htmlArray.join(""));
}

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
