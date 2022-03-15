import { Fragment } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import QuoteItem from '../atoms/QuoteItem';
import classes from './QuoteList.module.css';

const QuoteList = (props) => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const isAscending = queryParams.get('sort') === 'asc';
  function sortQuotes([...quotes], isAscending) {
    quotes.sort((quoteA, quoteB) => {
      if (isAscending) {
        return quoteA.id > quoteB.id ? 1 : -1; // sorting in ascending order i.e. if next item is greater, dont swap
      }
      return quoteA.id < quoteB.id ? 1 : -1; // sorting in desending order i.e. if next item is smaller, dont swap
    });
    return quotes;
  }
  const sortedQuotes = sortQuotes(props.quotes, isAscending);
  const handleListSorting = () => {
    history.push(`${location.pathname}?sort=${isAscending ? 'desc' : 'asc'}`);
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={handleListSorting}>
          Sort {isAscending ? 'Descending' : 'Ascending'}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
