import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comments/dto/comment.dto';
import {
  PaginationOptions,
  PaginationResult,
  paginate,
} from 'src/common/pagination';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  createComment(
    postId: number,
    definition: DeepPartial<CommentEntity>,
  ): Promise<CommentEntity> {
    const newComment = this.repository.create({
      ...definition,
      post: { id: postId },
    });

    return this.repository.save(newComment);
  }

  async getComments(
    paginationOptions: PaginationOptions,
  ): Promise<PaginationResult<CommentEntity>> {
    return await paginate<CommentEntity>(this.repository, paginationOptions);
  }

  async getComment(id: number): Promise<CommentEntity> {
    return await this.repository.findOneBy({ id });
  }

  async deleteComment(id: number): Promise<boolean> {
    return (await this.repository.delete(id)).affected > 0;
  }
}
