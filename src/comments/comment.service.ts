import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comments/dto/comment.dto';
import {
  PaginationOptions,
  PaginationResult,
  paginate,
} from 'src/common/pagination';
import { PostEntity } from 'src/posts/dto/post.dto';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private repository: Repository<CommentEntity>,
  ) {}

  createComment(
    definition: DeepPartial<CommentEntity>,
    postId: number,
  ): Promise<CommentEntity> {
    const newComment = this.repository.create({
      ...definition,
      post: { id: postId },
    });

    return this.repository.save(newComment);
  }

  async getComments(
    paginationOptions: PaginationOptions,
  ): Promise<PaginationResult<PostEntity>> {
    return await paginate<PostEntity>(this.repository, paginationOptions);
  }

  async getComment(id: number): Promise<CommentEntity> {
    return await this.repository.findOneBy({ id });
  }

  async deleteComment(id: number): Promise<boolean> {
    return (await this.repository.delete(id)).affected > 0;
  }
}
