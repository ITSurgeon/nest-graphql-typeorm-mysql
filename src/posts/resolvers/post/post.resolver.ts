import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CreatePostInput } from 'src/posts/inputs/create-post.input';
import { UpdatePostInput } from 'src/posts/inputs/update-post.input';
import { PostService } from 'src/posts/services/post/post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostEntity)
  createPost(@Args('input') input: CreatePostInput): Promise<PostEntity> {
    return this.postService.createPost(input);
  }

  @Mutation(() => PostEntity)
  async updatePost(@Args('input') input: UpdatePostInput): Promise<PostEntity> {
    return await this.postService.updatePost(input);
  }

  @Mutation(() => Boolean)
  deletePost(@Args('id') id: number): Promise<boolean> {
    return this.postService.deletePost(id);
  }

  @Query(() => [PostEntity])
  async getPosts(
    @Args('limit') limit: number,
    @Args('page') page: number,
  ): Promise<{ data: PostEntity[]; countAll: number; page: number }> {
    return await this.postService.getPosts(limit, page);
  }

  @Query(() => PostEntity)
  getPost(@Args('id') id: number): Promise<PostEntity> {
    return this.postService.getPost(id);
  }
}
