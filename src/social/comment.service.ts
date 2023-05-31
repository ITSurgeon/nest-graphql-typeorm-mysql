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
    paginationOptions: PaginationOffset,
  ): Promise<PaginationOffsetResult<CommentEntity>> {
    return paginate<CommentEntity>(this.repository, paginationOptions);
  }

  getComment(id: number): Promise<CommentEntity> {
    return this.repository.findOneBy({ id });
  }

  deleteComment(id: number): Promise<boolean> {
    return this.repository.delete(id).then((result) => result.affected > 0);
  }
}
