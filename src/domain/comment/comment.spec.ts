import { Comment, CommentProps } from 'src/domain/comment/comment';

describe('Comment Unit Tests', () => {
  it('should be constructor()', () => {
    const newComment = {
      "text": "Lorem ipsum ...",
      "userId": "5a4704c2-5d82-4522-9a61-ba30f7b9113d",
      "taskId": "504704c2-5d82-4522-9a61-ba30f7b9113d",
    };
    let taskProps: CommentProps = newComment;

    let task = Comment.create(taskProps);
    expect(task.props).toEqual({
      ...taskProps,
    });

    taskProps = newComment;

    expect(task.id).toBeDefined();
    task = Comment.create(taskProps);
    expect(task.props).toEqual({
      ...taskProps,
    });
  });

  it('should update methods', () => {
    const userProps: CommentProps = {
      "text": "Lorem ipsum ...",
      "userId": "5a4704c2-5d82-4522-9a61-ba30f7b9113d",
      "taskId": "504704c2-5d82-4522-9a61-ba30f7b9113d",
    };
    const comment = Comment.create(userProps);
    const newText = 'Lorem ipsum.';
    const userId = '5a4704c2-5d82-4522-9a61-ba30f7b91100'

    comment.updateText(newText);
    comment.updateUserId(userId);
 
    expect(comment.text).toBe(newText);
    expect(comment.userId).toBe(userId);
  });

  it('should be toJSON() method', () => {
    const data =  {
      "text": "Lorem ipsum ...",
      "userId": "5a4704c2-5d82-4522-9a61-ba30f7b9113d",
      "taskId": "504704c2-5d82-4522-9a61-ba30f7b9113d",
    };
    const commentProps: CommentProps = data;
    const comment = Comment.create(commentProps);
    comment.toJSON();
    data['id'] = comment.id;
    expect(comment.toJSON()).toStrictEqual(data);
  });

});
