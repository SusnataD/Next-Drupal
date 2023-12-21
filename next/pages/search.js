import React, { useEffect, useState } from "react";
import { useCommonContext } from "@/context/CommonContext";
import { GetGlobalElements } from "@/shared/getGlobalElements";
import { drupal } from "@/lib/drupal";
import Layout from "@/components/layout";
import InnerHeroSection from "@/components/innerHeroSection";
import { useRouter } from "next/router";
import api from "@/shared/api";
import { removeHTMLTags } from "@/shared/customFunction";
import Link from "next/link";
import { Button, Form } from "react-bootstrap";
import ReactPaginate from "react-paginate";

const Search = ({ node, globalElements }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [pageCount, setPageCount] = useState();
  const router = useRouter();

  // Use the data obtained from getStaticProps to update the common state
  const { updateCommonState } = useCommonContext();
  useEffect(() => {
    updateCommonState(globalElements);
  }, [globalElements]);

  useEffect(() => {
    if (router.query.request) {
      console.log("router.query.request > ", router.query.request);
      setSearchInput(router.query.request);
      _getSearchresult(router.query.request);
    }
  }, []);

  useEffect(() => {}, [searchResult]);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation, you can add more complex validation logic here
    if (!searchInput.trim()) {
      return;
    }

    // Handle the form submission logic here
    console.log("Form submitted with value:", searchInput);
    _getSearchresult(searchInput);
  };

  // API call function
  const _getSearchresult = async (input) => {
    let postData = {
      search_request: input,
    };

    let objJsonStr = JSON.stringify(postData);
    let objJsonB64 = Buffer.from(objJsonStr).toString("base64");

    await api
      .post("/common/api/search", objJsonB64)
      .then((response) => {
        if (response.status === 200) {
          const result = response?.data;
          console.log("result > ", result);

          if (result) {
            let objJsonB64decode = Buffer.from(result[0], "base64").toString(
              "utf-8"
            );
            let data = JSON.parse(objJsonB64decode);
            console.log("data > ", data);
            if (data.length > 0) {
              setSearchResult(data);
            } else {
              setSearchResult([]);
            }
          }
        }
      })
      .catch((error) => {});
  };

  function Items({ currentItems }) {
    return (
      <>
        {currentItems?.length ? (
          currentItems.map((item) => (
            <div className="row pt-3 pb-3" key={item.nid}>
              <div className="col-md-12">
                <div className="search-result-item">
                  <Link
                    href={item.url}
                    className="no-underline hover:text-blue-600"
                  >
                    {(() => {
                      // Perform the logic outside JSX
                      let html = removeHTMLTags(item.title);

                      // Create a regular expression with the specific word
                      const regex = new RegExp(`\\b${searchInput}\\b`, "gi");

                      // Use the replace method to add the prefix and suffix
                      const modifiedHtml = html.replace(
                        regex,
                        (match) => `<span>${match}</span>`
                      );

                      // Render the modified HTML
                      return (
                        <h3
                          className="title"
                          dangerouslySetInnerHTML={{ __html: modifiedHtml }}
                        />
                      );
                    })()}
                  </Link>

                  {(() => {
                    // Perform the logic outside JSX
                    let html = removeHTMLTags(
                      item.body
                        ? item.body.length > 280
                          ? item.body.slice(0, 280) + "..."
                          : item.body
                        : ""
                    );

                    // Create a regular expression with the specific word
                    const regex = new RegExp(`\\b${searchInput}\\b`, "gi");

                    // Use the replace method to add the prefix and suffix
                    const modifiedHtml = html.replace(
                      regex,
                      (match) => `<span>${match}</span>`
                    );

                    // Render the modified HTML
                    return (
                      <div
                        className="content"
                        dangerouslySetInnerHTML={{ __html: modifiedHtml }}
                      />
                    );
                  })()}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="row">
            <div className="col-md-12 text-center">
              <h3>No data found!</h3>
            </div>
          </div>
        )}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = searchResult
      .sort((a, b) => {
        // Convert names to uppercase for case-insensitive sorting
        const nameA = a.title.toUpperCase();
        const nameB = b.title.toUpperCase();
        if (nameA < nameB) {
          return -1; // If nameA comes before nameB, return a negative value
        }
        if (nameA > nameB) {
          return 1; // If nameA comes after nameB, return a positive value
        }
        return 0; // Names are equal
      })
      .slice(itemOffset, endOffset);
    setPageCount(Math.ceil(searchResult.length / itemsPerPage));

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % searchResult.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </>
    );
  }

  return (
    <Layout
      title={node.title}
      description={node.field_meta_description}
      keyword={node.field_meta_keyword}
    >
      {console.log("SearchResult > ", searchResult)}
      <InnerHeroSection
        title={node.title}
        desktop_banner_img={node.field_desktop_banner_image.field_media_image}
      />
      <section>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Search here"
                  className="me-2"
                  aria-label="Search"
                  value={searchInput}
                  onChange={handleChange}
                />
                <Button type="submit" variant="outline-success">
                  Search
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
      <section className="search-result">
        <div className="container">
          <PaginatedItems itemsPerPage={3} />
        </div>
      </section>
    </Layout>
  );
};

export async function getStaticProps(context) {
  try {
    const globalElements = await GetGlobalElements(drupal);

    // Fetch data from Drupal for nodes
    const node = await drupal.getResource(
      "node--page",
      "ceac8b79-9d2a-43ca-9820-7e758d8ed69f",
      {
        params: {
          "filter[status]": 1,
          "fields[node--page]":
            "title,path,body,field_meta_keyword,field_meta_description,field_desktop_banner_image,field_mobile_banner_image,uid,created",
          include:
            "uid,field_desktop_banner_image.field_media_image,field_mobile_banner_image.field_media_image",
        },
      }
    );

    return {
      props: { node, globalElements },
    };
  } catch (error) {
    // Handle the error here, you can log it or dispatch another action
    console.error("Error in getStaticProps:", error);
    // You might want to return an error payload or redirect to an error page
    return {
      props: { error: "An error occurred while fetching data." },
    };
  }
}
export default Search;
