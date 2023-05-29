import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/dto/post.dto';
import { DeepPartial, Repository } from 'typeorm';
import { PostUpdateInput } from './dto/post.input';

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
  ): Promise<{ data: PostEntity[]; totalCount: number; page: number }> {
    const [posts, totalCount] = await this.postRepository.findAndCount({
      take: limit,
      skip: page > 0 ? (page - 1) * limit : 0,
    });

    return {
      data: posts,
      totalCount,
      page,
    };
  }

  async getPost(id: number): Promise<PostEntity> {
    return await this.postRepository.findOneBy({ id });
  }

  async updatePost(id: number, input: PostUpdateInput): Promise<PostEntity> {
    await this.postRepository.update({ id }, { ...input });
    return await this.postRepository.findOneBy({ id });
  }

  async deletePost(id: number): Promise<boolean> {
    return (await this.postRepository.delete(id)).affected > 0;
  }
}
