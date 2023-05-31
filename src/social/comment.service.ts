import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/social/dto/comment.dto';
import {
  PaginationOffset,
  PaginationOffsetResult,
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

  getComments(
    postId: number,
    paginationOptions: PaginationOffset,
  ): Promise<PaginationOffsetResult<CommentEntity>> {
    const query = { where: { post: { id: postId } } };
    return paginate<CommentEntity>(this.repository, paginationOptions, query);
  }

  getComment(id: number): Promise<CommentEntity> {
    return this.repository.findOneBy({ id });
  }

  async deleteComment(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }
}
