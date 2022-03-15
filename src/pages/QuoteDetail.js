import {
  Route,
  Link,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';

import HighlightedQuote from '../components/molecules/HighlightedQuote';
import Comments from '../components/organisms/Comments';
import useHttp from '../hooks/use-http';
import { getSingleQuote } from '../lib/api';
import { useEffect } from 'react';
import LoadingSpinner from '../components/atoms/LoadingSpinner';

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const {
    sendRequest,
    status,
    data: quoteDetails,
    error,
  } = useHttp(getSingleQuote, true);
  
  const {quoteId} = params;

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if(status === 'pending') {
    return <div className='centered'><LoadingSpinner /></div>;
  }
  if (!quoteDetails.text) {
    return <p>No quote found!</p>;
  }

  if(error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <HighlightedQuote text={quoteDetails.text} author={quoteDetails.author} />
      <Switch>
        <Route path={`${match.path}`} exact>
          <div className='centered'>
            <Link className='btn--flat' to={`${match.url}/comments`}>
              Load Comments
            </Link>
          </div>
        </Route>
        <Route path={`${match.path}/comments`}>
          <Comments quoteId = {quoteId}/>
        </Route>
      </Switch>
    </section>
  );
};

export default QuoteDetail;
