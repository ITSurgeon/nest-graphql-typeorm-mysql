import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/dto/post.dto';
import { DeepPartial, Repository } from 'typeorm';
import { PostUpdateInput } from './dto/post.input';
import {
  PaginationOptions,
  PaginationResult,
  paginate,
} from 'src/common/pagination';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  async createPost(definition: DeepPartial<PostEntity>): Promise<PostEntity> {
    return await this.repository.save(definition);
  }

  async getPosts(
    paginationOptions: PaginationOptions,
  ): Promise<PaginationResult<PostEntity>> {
    return await paginate<PostEntity>(this.repository, paginationOptions);
  }

  async getPost(id: number): Promise<PostEntity> {
    return await this.repository.findOneBy({ id });
  }

  async updatePost(id: number, input: PostUpdateInput): Promise<PostEntity> {
    await this.repository.update({ id }, { ...input });
    return await this.repository.findOneBy({ id });
  }

  async deletePost(id: number): Promise<boolean> {
    return (await this.repository.delete(id)).affected > 0;
  }
}
