import { removeHTMLTags } from "@/shared/customFunction";
import Link from "next/link";

const SearchPart = ({ searchInput, searchResult }) => {
  return (
    <section className="search-result">
      <div className="container">
        {searchResult?.length ? (
          searchResult.map((item) => (
            <div className="row pt-3 pb-3" key={item.nid}>
              <div className="col-md-12">
                <div className="search-result-item">
                  <Link
                    href={item.url}
                    className="no-underline hover:text-blue-600"
                  >
                    <h3>{item.title}</h3>
                  </Link>

                  {(() => {
                    // Perform the logic outside JSX
                    let html = removeHTMLTags(
                      item.body
                        ? item.body.length > 250
                          ? item.body.slice(0, 250) + "..."
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
      </div>
    </section>
  );
};

export default SearchPart;
