import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
// const DUMMY_QUOTES = [
//   { id: "q1", author: "shxnk", text: "react is cool" },
//   { id: "q2", author: "shxnk", text: "react-router is cool" },
//   { id: "q3", author: "shxnk", text: "react-router-dom is cool" },
//   { id: "q4", author: "shxnk", text: "Redux-toolkit  is cool" }
// ];

const QuoteDetail = () => {
  const { sendRequest, status, data: loadedQuote, error } = useHttp(
    getSingleQuote,
    true
  );
  const match = useRouteMatch();
  const params = useParams();
  // const quote = DUMMY_QUOTES.find((item) => item.id === params.quoteId);
  const { quoteId } = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="centered">{error}</div>;
  }

  if (!loadedQuote.text) {
    return <p>No quote Found</p>;
  }
  return (
    <Fragment>
      <HighlightedQuote {...loadedQuote} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
