import {
  searchInputEl,
  searchFormEl,
  spinnerSearchEl,
  jobListSearchEl,
  numberEl,
  errorTextEl,
  errorEl,
} from "../common.js";

import { fetchJobs } from "./Joblist.js";

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
