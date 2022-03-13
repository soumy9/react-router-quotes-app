import { Fragment } from 'react';
import QuoteList from '../components/quotes/QuoteList';
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

const AllQuotes = () => {
  return (<Fragment>
    <QuoteList quotes = {DUMMY_QUOTES} />
  </Fragment>);
};

export default AllQuotes;
