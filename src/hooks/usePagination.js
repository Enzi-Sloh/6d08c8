export const DOTS = "...";
export const Invis = "";
import React, { useState } from "react";

function usePagination(props) {
  let lastPage = Math.ceil(props.totalCount / props.pageSize);
  let currentPage = props.currentPage;
  let previousPage = (props.currentPage -= 1);
  let pageBefore = previousPage - 1;
  let nextPage = (props.currentPage += 2);
  let pageAfter = nextPage + 1;
  if (props.pageSize == props.totalCount || props.pageSize > props.totalCount) {
    return [1, Invis, Invis, Invis, Invis, Invis, Invis];
  } else if (currentPage == 1 || currentPage == 2) {
    if (currentPage == 1) {
      return [currentPage, nextPage, pageAfter, DOTS, Invis, Invis, lastPage];
    } else if (currentPage == 2) {
      return [
        previousPage,
        currentPage,
        nextPage,
        DOTS,
        Invis,
        Invis,
        lastPage,
      ];
    }
  } else if (currentPage == lastPage || currentPage == lastPage - 1) {
    if (currentPage == lastPage) {
      return [1, Invis, Invis, DOTS, pageBefore, previousPage, currentPage];
    } else {
      return [1, Invis, Invis, DOTS, previousPage, currentPage, lastPage];
    }
  } else if (
    currentPage != 1 &&
    currentPage != 2 &&
    currentPage != lastPage &&
    currentPage != lastPage - 1
  ) {
    return [1, DOTS, previousPage, currentPage, nextPage, DOTS, lastPage];
  }
  /*
    Rewrite the logic here to map out the pagination to be displayed

    !!!!!! ATTENTION !!!!!!
    This hook takes the current page number and gives an output based on the position of the current page. 
    Examples if the current page number is the first or last page it will give an output of four page numbers and dots to symbolize distance between.
    
  */
}

export default usePagination;
