import { searchInputEl, searchFormEl, jobListSearchEl } from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";

import { fetchJobs } from "./Joblist.js";

const submitHandler = (e) => {
  e.preventDefault();

  const searchText = searchInputEl.value;

  const forbiddenPattern = /[0-9]/;
  const patterMatch = forbiddenPattern.test(searchText);

  if (patterMatch) {
    renderError("numbers are not allowed");
    return;
  }
  searchInputEl.blur();
  jobListSearchEl.innerHTML = "";
  fetchJobs(searchText);
  searchInputEl.value = " ";

  renderSpinner("search");
};

searchFormEl.addEventListener("submit", submitHandler);
