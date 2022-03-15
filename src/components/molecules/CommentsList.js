import CommentItem from '../atoms/CommentItem';
import classes from './CommentsList.module.css';

const CommentsList = (props) => {
  return (
    <ul className={classes.comments}>
      {props.comments.map((comment) => {
        return <CommentItem key={comment.id} text={comment.commentsData.text} />
      })}
    </ul>
  );
};

export default CommentsList;