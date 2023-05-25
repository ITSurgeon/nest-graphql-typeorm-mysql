import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CreateCommentInput } from 'src/comments/inputs/create-comment.input';
import { CommentService } from 'src/comments/services/comment/comment.service';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CommentEntity)
  async createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ): Promise<CommentEntity> {
    return await this.commentService.createComment(createCommentInput);
  }

  @Mutation(() => Boolean)
  deleteComment(@Args('id') id: number): Promise<boolean> {
    return this.commentService.deleteComment(id);
  }

  @Query(() => [CommentEntity])
  async getComments(): Promise<CommentEntity[]> {
    return await this.commentService.getComments();
  }

  @Query(() => CommentEntity)
  async getComment(@Args('id') id: number): Promise<CommentEntity> {
    return await this.commentService.getComment(id);
  }
}
