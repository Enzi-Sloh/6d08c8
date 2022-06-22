import "../css/pagination.scss";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import usePagination, { DOTS, Invis } from "../hooks/usePagination";

import PropTypes, { bool } from "prop-types";
import React, { useState, useRef, useEffect } from "react";
import { nanoid } from "nanoid";

export let currentPageSize = 0;
export let pageChange = 1;

function Pagination({
  onPageChange,
  onPageSizeOptionChange,
  totalCount,
  currentPage,
  pageSize,
  pageSizeOptions,
}) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });
  const keyRef = [];
  let lastPage = Math.ceil(totalCount / pageSize);
  const [leftDisabled, setLeftDisabled] = useState(true);
  const [rightDisabled, setRightDisabled] = useState(false);

  useEffect(() => {
    if (keyRef[0] == keyRef[pageChange - 1]) {
      keyRef[0].current.ariaCurrent = "page";
    } else if (pageChange == 2) {
      keyRef[1].current.ariaCurrent = "page";
    } else if (pageChange == lastPage) {
      keyRef[6].current.ariaCurrent = "page";
    } else if (pageChange == lastPage - 1) {
      keyRef[5].current.ariaCurrent = "page";
    } else {
      keyRef[3].current.ariaCurrent = "page";
      console.log("yayayy");
    }
  }, [pageChange]);

  const onNext = () => {
    if (currentPage != lastPage) {
      pageChange += 1;
      onPageChange((currentPage += 1));
    }
    if (currentPage == lastPage) {
      setRightDisabled(true);
    } else {
      setRightDisabled(false);
      setLeftDisabled(false);
    }
  };

  const onPrevious = () => {
    if (currentPage != 1) {
      pageChange -= 1;
      onPageChange((currentPage -= 1));
    }
    if (currentPage == 1) {
      setLeftDisabled(true);
    } else {
      setLeftDisabled(false);
      setRightDisabled(false);
    }
  };
  const onSelect = (num) => {
    pageChange = num;
    onPageChange((currentPage = num));
    if (pageChange == 1) {
      setLeftDisabled(true);
      setRightDisabled(false);
    } else if (pageChange == lastPage) {
      setRightDisabled(true);
      setLeftDisabled(false);
    } else {
      setLeftDisabled(false);
      setRightDisabled(false);
    }
  };

  return (
    <ul
      className="wrapper"
      // Do not remove the aria-label below, it is used for Hatchways automation.
      aria-label="Blog post pagination list"
    >
      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton left"
          // Do not remove the aria-label below, it is used for Hatchways automation.
          aria-label="Goto previous page"
          onClick={onPrevious}
          disabled={leftDisabled} // change this line to disable a button.
        >
          <ChevronLeftIcon />
        </button>
      </li>

      {paginationRange.map((pageNumber) => {
        const key = nanoid();
        const refCheck = useRef();
        keyRef.push(refCheck);

        if (pageNumber === DOTS) {
          return (
            <li key={key} className="dots">
              &#8230;
            </li>
          );
        }
        if (pageNumber === Invis) {
          return <li key={key} className="invis"></li>;
        }
        console.log(paginationRange);
        return (
          <li
            key={key}
            ref={refCheck}
            className="paginationItem"
            aria-current="false" // change this line to highlight a current page.
          >
            <button
              type="button"
              // Do not remove the aria-label below, it is used for Hatchways automation.
              aria-label={`Goto page ${pageNumber}`}
              onClick={() => onSelect(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        );
      })}

      <li className="paginationItem">
        <button
          type="button"
          className="arrowButton right"
          // Do not remove the aria-label below, it is used for Hatchways automation.
          aria-label="Goto next page"
          onClick={onNext}
          disabled={rightDisabled} // change this line to disable a button.
        >
          <ChevronRightIcon />
        </button>
      </li>

      <select
        className="paginationSelector"
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="Select page size"
        value={pageSize}
        onChange={(e) => {
          if (e.target.value == pageSizeOptions[0]) {
            currentPageSize = 0;
          } else if (e.target.value == pageSizeOptions[1]) {
            currentPageSize = 1;
          } else if (e.target.value == pageSizeOptions[2]) {
            currentPageSize = 2;
          } else if (e.target.value == pageSizeOptions[3]) {
            currentPageSize = 3;
          }
          pageChange = 1;
          onPageSizeOptionChange(pageSizeOptions[currentPageSize]);
        }}
      >
        {pageSizeOptions.map((size) => (
          <option key={size} defaultValue={pageSize === size} value={size}>
            {size} per page
          </option>
        ))}
      </select>
    </ul>
  );
}

Pagination.propTypes = {
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.instanceOf(Array),
  onPageChange: PropTypes.func,
  onPageSizeOptionChange: PropTypes.func,
  leftDisabled: PropTypes.bool,
};

Pagination.defaultProps = {
  totalCount: 0,
  currentPage: 1,
  pageSize: 1,
  pageSizeOptions: [15, 25, 50, 100],
  onPageChange: () => {},
  onPageSizeOptionChange: () => {},
  leftDisabled: false,
};

export default Pagination;
