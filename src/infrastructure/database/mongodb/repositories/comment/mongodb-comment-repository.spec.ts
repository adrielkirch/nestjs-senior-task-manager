import { Model } from 'mongoose';
import { MongodbCommentRepository } from 'src/infrastructure/database/mongodb/repositories/comment/mongodb-comment-repository';
import { CommentModel } from 'src/infrastructure/database/mongodb/models/comment/comment.model';
import { CommentProps } from 'src/domain/comment/comment';
import { Comment } from 'src/domain/comment/comment';
import DateUtil from 'src/utils/util.date';

const commentModelMock = {
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
} as unknown as Model<CommentModel>;


const newComment = {
  title: 'any_title',
  text: 'any_text',
  expirationDate: DateUtil.defaultFormatToISO("01/01/2100 00:00:00"),
  remindDate: DateUtil.defaultFormatToISO("01/01/2100 00:00:00"),
  status: 'TODO',
  assignTo: 'assignTo_id',
  userId: 'user_id',
};

describe('MongodbCommentRepository Unit Test', () => {
  let mongodbCommentRepository: MongodbCommentRepository;

  beforeEach(() => {
    jest.clearAllMocks();

    mongodbCommentRepository = new MongodbCommentRepository(commentModelMock);
  });

  it('should be defined', () => {
    expect(mongodbCommentRepository).toBeDefined();
  });

  
  it('should create new comment', async () => {
    const commentProps: CommentProps = newComment;
    const comment = Comment.create(commentProps);
    await mongodbCommentRepository.create(comment); 
    expect(commentModelMock.create).toHaveBeenCalledTimes(1);
  });

  it('should find an array of comments', async () => {
    const commentProps: CommentProps = newComment;
    const comment = Comment.create(commentProps);
    await mongodbCommentRepository.create(comment);
    await mongodbCommentRepository.create(comment);
    await mongodbCommentRepository.find();
    expect(commentModelMock.create).toHaveBeenCalledTimes(2);
    expect(commentModelMock.find).toHaveBeenCalledTimes(1);
  });

  it('should find a comment by id', async () => {
    const commentProps: CommentProps = newComment;
    const comment = Comment.create(commentProps);
    await mongodbCommentRepository.create(comment);

    await mongodbCommentRepository.findById(comment.id);

    expect(commentModelMock.findOne).toHaveBeenCalledTimes(1);
  });

  it('should update a comment by id', async () => {
    const commentProps: CommentProps = newComment;
    const comment = Comment.create(commentProps);
    await mongodbCommentRepository.create(comment);
    
    comment.text = 'new text';
    await mongodbCommentRepository.update(comment);

    expect(commentModelMock.findOneAndUpdate).toHaveBeenCalledTimes(1);
  });

  it('should remove a comment by id', async () => {
    const commentProps: CommentProps = newComment;
    const comment = Comment.create(commentProps);
    await mongodbCommentRepository.create(comment);

    await mongodbCommentRepository.delete(comment.id);
    expect(commentModelMock.deleteOne).toHaveBeenCalledTimes(1);
  });
});
