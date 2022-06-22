import BlogPost from "./BlogPost";
import Pagination, { currentPageSize, pageChange } from "./Pagination";
import React, { useState } from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];
function BlogList() {
  const [pageLeast, setPageLeast] = useState(0);
  const [pageMax, setPageMax] = useState(PAGE_SIZES[currentPageSize]);
  const currentPaginationData = blogs.posts.slice(pageLeast, pageMax);
  const updateRowsPerPage = () => {
    console.log(PAGE_SIZES[currentPageSize]);
    updatePage();
  };
  const updatePage = () => {
    if (pageChange == 1) {
      setPageLeast(0);
      setPageMax(PAGE_SIZES[currentPageSize]);
    } else if (pageChange != 1) {
      setPageLeast(PAGE_SIZES[currentPageSize] * (pageChange - 1) + 1);
      setPageMax(PAGE_SIZES[currentPageSize] * pageChange);
      console.log(pageMax);
    }
  };

  return (
    <div>
      <Pagination
        currentPage={pageChange}
        totalCount={blogs.posts.length}
        pageSize={PAGE_SIZES[currentPageSize]}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;
