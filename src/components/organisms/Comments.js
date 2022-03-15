import { useState } from 'react';

import LoadingSpinner from '../atoms/LoadingSpinner';
import classes from './Comments.module.css';
import CommentsList from '../molecules/CommentsList';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import { useEffect } from 'react';
import { useCallback } from 'react';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {
    sendRequest,
    status,
    data: commentsData,
    error,
  } = useHttp(getAllComments);
  let comments;
  const { quoteId } = props;

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    setIsAddingComment(false);
    sendRequest(quoteId);
  }, [sendRequest, quoteId, setIsAddingComment]);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    comments = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    );
  }

  if (status === 'completed') {
    if (!commentsData || !commentsData.length) {
      comments = <p>No comments added yet</p>;
    } else {
      comments = (
        <CommentsList quoteId={props.quoteId} comments={commentsData}/>
      );
    }
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          onAddedComment={addedCommentHandler}
          quoteId={quoteId}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
