import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostEntity } from 'src/social/dto/post.dto';
import { PostCreateInput, PostUpdateInput } from 'src/social/dto/post.input';
import { PostPaginationType } from 'src/social/types/post-pagination.type';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostEntity)
  createPost(@Args('input') input: PostCreateInput): Promise<PostEntity> {
    return this.postService.createPost(input);
  }

  @Mutation(() => PostEntity)
  updatePost(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: PostUpdateInput,
  ): Promise<PostEntity> {
    return this.postService.updatePost(id, input);
  }

  @Mutation(() => Boolean)
  deletePost(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    return this.postService.deletePost(id);
  }

  @Query(() => PostPaginationType)
  getPosts(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  ): Promise<PostPaginationType> {
    return this.postService.getPosts({ limit, page });
  }

  @Query(() => PostEntity)
  getPost(@Args('id', { type: () => Int }) id: number): Promise<PostEntity> {
    return this.postService.getPost(id);
  }
}
