import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/dto/post.dto';
import { DeepPartial, Repository } from 'typeorm';
import { PostUpdateInput } from './dto/post.input';
import {
  PaginationOffset,
  PaginationOffsetResult,
  paginate,
} from 'src/common/pagination';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private repository: Repository<PostEntity>,
  ) {}

  createPost(definition: DeepPartial<PostEntity>): Promise<PostEntity> {
    return this.repository.save(definition);
  }

  getPosts(
    paginationOptions: PaginationOffset,
  ): Promise<PaginationOffsetResult<PostEntity>> {
    return paginate<PostEntity>(this.repository, paginationOptions);
  }

  getPost(id: number): Promise<PostEntity> {
    return this.repository.findOneBy({ id });
  }

  async updatePost(id: number, input: PostUpdateInput): Promise<PostEntity> {
    await this.repository.update({ id }, { ...input });
    return this.repository.findOneBy({ id });
  }

  async deletePost(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
