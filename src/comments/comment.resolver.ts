import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentEntity } from 'src/comments/dto/comment.dto';
import { CommentCreateInput } from 'src/comments/dto/comment.input';
import { CommentService } from './comment.service';
import { CommentPaginationType } from './types/comment-pagination.type';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CommentEntity)
  async createComment(
    @Args('postId') postId: number,
    @Args('createCommentInput') commentCreateInput: CommentCreateInput,
  ): Promise<CommentEntity> {
    return await this.commentService.createComment(postId, commentCreateInput);
  }

  @Mutation(() => Boolean)
  deleteComment(@Args('id') id: number): Promise<boolean> {
    return this.commentService.deleteComment(id);
  }

  @Query(() => CommentPaginationType)
  async getComments(
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
  ): Promise<CommentPaginationType> {
    return await this.commentService.getComments(limit, page);
  }

  @Query(() => CommentEntity)
  async getComment(@Args('id') id: number): Promise<CommentEntity> {
    return await this.commentService.getComment(id);
  }
}
