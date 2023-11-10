import { numberEl, jobListSearchEl, jobDetailsContentEl } from "../common.js";

import renderSpinner from "./Spinner.js";
export const fetchJobs = async (searchText) => {
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
    renderSpinner("search");

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

export const fetchJobDetails = async (id) => {
  try {
    const res = await fetch(
      `https://bytegrad.com/course-assets/js/2/api/jobs/${id}`
    );
    const data = await res.json();
    if (!res.ok) {
      console.log("something went wrong");
      return;
    }

    const { jobItem } = data;
    renderSpinner("job-details");

    const jobDetailsHTML = `<img src="${
      jobItem.coverImgURL
    }" alt="#" class="job-details__cover-img">

   <a class="apply-btn" href="${
     jobItem.companyURL
   }" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>
   
   <section class="job-info">
       <div class="job-info__left">
           <div class="job-info__badge">${jobItem.badgeLetters}</div>
           <div class="job-info__below-badge">
               <time class="job-info__time">${jobItem.daysAgo}d</time>
               <button class="job-info__bookmark-btn">
                   <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
               </button>
           </div>
       </div>
       <div class="job-info__right">
           <h2 class="second-heading">${jobItem.title}</h2>
           <p class="job-info__company">${jobItem.company}</p>
           <p class="job-info__description">${jobItem.description}</p>
           <div class="job-info__extras">
               <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> ${
                 jobItem.duration
               }</p>
               <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i>${
                 jobItem.salary
               }</p>
               <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i>${
                 jobItem.location
               }</p>
           </div>
       </div>
   </section>
   
   <div class="job-details__other">
       <section class="qualifications">
           <div class="qualifications__left">
               <h4 class="fourth-heading">Qualifications</h4>
               <p class="qualifications__sub-text">Other qualifications may apply</p>
           </div>
           <ul class="qualifications__list">
           ${jobItem.qualifications
             .map((item) => {
               return `<li class="qualifications__item">${item}</li>`;
             })
             .join(" ")}
               
           </ul>
       </section>
   
       <section class="reviews">
           <div class="reviews__left">
               <h4 class="fourth-heading">Company reviews</h4>
               <p class="reviews__sub-text">Recent things people are saying</p>
           </div>
           <ul class="reviews__list">
               ${jobItem.reviews
                 .map((item) => {
                   return `<li class="reviews__item">${item}</li>`;
                 })
                 .join(" ")}
           </ul>
       </section>
   </div>
   
   <footer class="job-details__footer">
       <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
    </footer>`;

    jobDetailsContentEl.innerHTML = jobDetailsHTML;
  } catch (error) {
    console.log(error);
  }
};

const clickHandler = (event) => {
  event.preventDefault();

  const jobItemEl = event.target.closest(".job-item");
  document
    .querySelector(".job-item--active")
    ?.classList.remove("job-item--active");

  jobItemEl.classList.add("job-item--active");

  jobDetailsContentEl.innerHTML = "";
  renderSpinner("job-details");

  const id = jobItemEl.children[0].getAttribute("href");
  fetchJobDetails(id);
};

jobListSearchEl.addEventListener("click", clickHandler);
