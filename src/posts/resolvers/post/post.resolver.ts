import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CreatePostInput } from 'src/posts/inputs/create-post.input';
import { UpdatePostInput } from 'src/posts/inputs/update-post.input';
import { PostService } from 'src/posts/services/post/post.service';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => PostEntity)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
  ): Promise<PostEntity> {
    return await this.postService.createPost(createPostInput);
  }

  @Mutation(() => PostEntity)
  async updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
  ): Promise<PostEntity> {
    return await this.postService.updatePost(updatePostInput);
  }

  @Mutation(() => Number)
  async deletePost(@Args('id') id: number): Promise<number> {
    return await this.postService.deletePost(id);
  }

  @Query(() => [PostEntity])
  async getPosts(): Promise<PostEntity[]> {
    return await this.postService.getPosts();
  }

  @Query(() => PostEntity)
  async getPost(@Args('id') id: number): Promise<PostEntity> {
    return await this.postService.getPost(id);
  }
}
