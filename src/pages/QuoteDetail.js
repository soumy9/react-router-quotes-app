import { Route, Link, Switch, useParams } from 'react-router-dom';

import HighlightedQuote from '../components/quotes/HighlightedQuote';
import Comments from '../components/comments/Comments';
const DUMMY_QUOTES = [
  {
    id: 'q1',
    author: 'Soumy',
    text: 'Learning react is fun',
  },
  {
    id: 'q2',
    author: 'Soumy Sharma',
    text: 'Learning react is great',
  },
];
const QuoteDetail = () => {
  const params = useParams();
  const quoteDetails = DUMMY_QUOTES.find(
    (quote) => quote.id === params.quoteId
  );
  if (!quoteDetails) {
    return;
  }
  return (
    <section>
      <HighlightedQuote text={quoteDetails.text} author={quoteDetails.author} />
      <Switch>
        <Route path={`/quotes/${params.quoteId}`} exact>
          <div className='centered'>
            <Link
              className='btn--flat'
              to={`/quotes/${params.quoteId}/comments`}
            >
              Load Comments
            </Link>
          </div>
        </Route>
        <Route path={`/quotes/${params.quoteId}/comments`}>
          <Comments />
        </Route>
      </Switch>
    </section>
  );
};

export default QuoteDetail;
