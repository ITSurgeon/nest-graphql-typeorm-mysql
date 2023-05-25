import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/entities/post.entity';
import { UpdatePostInput } from 'src/posts/inputs/update-post.input';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  createPost(definition: DeepPartial<PostEntity>): Promise<PostEntity> {
    return this.postRepository.save(definition);
  }

  async getPosts(
    limit: number,
    page: number,
  ): Promise<{ data: PostEntity[]; countAll: number; page: number }> {
    const [posts, countAll] = await this.postRepository.findAndCount({
      take: limit,
      skip: page > 0 ? (page - 1) * limit : 0,
    });

    return {
      data: posts,
      countAll,
      page,
    };
  }

  async getPost(id: number): Promise<PostEntity> {
    return await this.postRepository.findOneBy({ id });
  }

  async updatePost(updatePostInput: UpdatePostInput): Promise<PostEntity> {
    await this.postRepository.update(
      { id: updatePostInput.id },
      { ...updatePostInput },
    );
    return await this.postRepository.findOneBy({ id: updatePostInput.id });
  }

  async deletePost(id: number): Promise<boolean> {
    return (await this.postRepository.delete(id)).affected > 0;
  }
}
