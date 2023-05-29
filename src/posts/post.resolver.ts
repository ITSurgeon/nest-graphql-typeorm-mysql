import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostEntity } from 'src/posts/dto/post.dto';
import { PostCreateInput, PostUpdateInput } from 'src/posts/dto/post.input';
import { PostPaginationType } from 'src/posts/types/post-pagination.type';
import { PostService } from './post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostEntity)
  createPost(@Args('input') input: PostCreateInput): Promise<PostEntity> {
    return this.postService.createPost(input);
  }

  @Mutation(() => PostEntity)
  async updatePost(
    @Args('id') id: number,
    @Args('input') input: PostUpdateInput,
  ): Promise<PostEntity> {
    return await this.postService.updatePost(id, input);
  }

  @Mutation(() => Boolean)
  deletePost(@Args('id') id: number): Promise<boolean> {
    return this.postService.deletePost(id);
  }

  @Query(() => PostPaginationType)
  async getPosts(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
  ): Promise<PostPaginationType> {
    return await this.postService.getPosts(limit, page);
  }

  @Query(() => PostEntity)
  getPost(@Args('id') id: number): Promise<PostEntity> {
    return this.postService.getPost(id);
  }
}
