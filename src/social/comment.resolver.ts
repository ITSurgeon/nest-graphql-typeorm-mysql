import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentEntity } from 'src/social/dto/comment.dto';
import { CommentCreateInput } from 'src/social/dto/comment.input';
import { CommentService } from './comment.service';
import { PaginationOffsetResult } from '../common/pagination';
import { CommentPaginationType } from './types/comment-pagination.type';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CommentEntity)
  createComment(
    @Args('postId') postId: number,
    @Args('createCommentInput') commentCreateInput: CommentCreateInput,
  ): Promise<CommentEntity> {
    return this.commentService.createComment(postId, commentCreateInput);
  }

  @Mutation(() => Boolean)
  deleteComment(@Args('id') id: number): Promise<boolean> {
    return this.commentService.deleteComment(id);
  }

  @Query(() => CommentPaginationType)
  getComments(
    @Args('postId', { type: () => Number }) postId: number,
    @Args('limit', { type: () => Number, defaultValue: 10 }) limit: number,
    @Args('page', { type: () => Number, defaultValue: 1 }) page: number,
  ): Promise<PaginationOffsetResult<CommentEntity>> {
    return this.commentService.getComments(postId, { limit, page });
  }

  @Query(() => CommentEntity, { nullable: true })
  getComment(@Args('id') id: number): Promise<CommentEntity> {
    return this.commentService.getComment(id);
  }
}
