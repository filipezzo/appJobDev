const bookmarksBtnEl = document.querySelector(".bookmarks-btn");
const errorEl = document.querySelector(".error");
const errorTextEl = document.querySelector(".error__text");
const jobDetailsEl = document.querySelector(".job-details");
const jobDetailsContentEl = document.querySelector(".job-details__content");
const jobListBookmarksEl = document.querySelector(".job-list--bookmarks");
const jobListSearchEl = document.querySelector(".job-list--search");
const numberEl = document.querySelector(".count__number");
const paginationEl = document.querySelector(".pagination");
const paginationBtnNextEl = document.querySelector(".pagination__button--next");
const paginationBtnBackEl = document.querySelector(".pagination__button--back");
const paginationNumberNextEl = document.querySelector(
  ".pagination__number--next"
);
const paginationNumberBackEl = document.querySelector(
  ".pagination__number--back"
);
const searchFormEl = document.querySelector(".search");
const searchInputEl = document.querySelector(".search__input");
const sortingEl = document.querySelector(".sorting");
const sortingBtnRelevantEl = document.querySelector(
  ".sorting__button--relevant"
);
const sortingBtnRecentEl = document.querySelector(".sorting__button--recent");
const spinnerSearchEl = document.querySelector(".spinner--search");
const spinnerJobDetailsEl = document.querySelector(".spinner--job-details");

const fetchJobs = async (searchText) => {
  try {
    const response = await fetch(
      `https://bytegrad.com/course-assets/js/2/api/jobs?search=${searchText}`
    );
    const data = await response.json();
    if (!response.ok) {
      console.log("something went wrong");
      return;
    }

    const { jobItems } = data;

    numberEl.textContent = jobItems.length;
    spinnerSearchEl.classList.remove("spinner--visible");

    jobItems.slice(0, 7).forEach((job) => {
      const newJobItemHTML = `<li class="job-item">
      <a class="job-item__link" href="${job.id}">
          <div class="job-item__badge">${job.badgeLetters}</div>
          <div class="job-item__middle">
              <h3 class="third-heading">${job.title}</h3>
              <p class="job-item__company">${job.company}</p>
              <div class="job-item__extras">
                  <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${job.duration}</p>
                  <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i>${job.salary}</p>
                  <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i>${job.location}</p>
              </div>
          </div>
          <div class="job-item__right">
              <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
              <time class="job-item__time">${job.daysAgo}d</time>
          </div>
      </a>
  </li>
  `;

      jobListSearchEl.insertAdjacentHTML("beforeend", newJobItemHTML);
    });
  } catch (error) {
    console.log(error);
  }
};

const submitHandler = (e) => {
  e.preventDefault();

  const searchText = searchInputEl.value;

  const forbiddenPattern = /[0-9]/;
  const patterMatch = forbiddenPattern.test(searchText);

  if (patterMatch) {
    errorTextEl.textContent = "Numbers are not allowed";
    errorEl.classList.add("error--visible");
    setTimeout(() => {
      errorEl.classList.remove("error--visible");
    }, 3500);
    return;
  }
  searchInputEl.blur();
  jobListSearchEl.innerHTML = "";
  fetchJobs(searchText);
  searchInputEl.value = " ";

  spinnerSearchEl.classList.add("spinner--visible");
};

searchFormEl.addEventListener("submit", submitHandler);
