import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comments/dto/comment.dto';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  createComment(
    postId: number,
    definition: DeepPartial<CommentEntity>,
  ): Promise<CommentEntity> {
    const newComment = this.commentRepository.create({
      ...definition,
      post: { id: postId },
    });

    return this.commentRepository.save(newComment);
  }

  async getComments(
    limit: number,
    page: number,
  ): Promise<{ data: CommentEntity[]; totalCount: number; page: number }> {
    const [comments, totalCount] = await this.commentRepository.findAndCount({
      take: limit,
      skip: page > 0 ? (page - 1) * limit : 0,
    });

    return {
      data: comments,
      totalCount,
      page,
    };
  }

  async getComment(id: number): Promise<CommentEntity> {
    return await this.commentRepository.findOneBy({ id });
  }

  async deleteComment(id: number): Promise<boolean> {
    return (await this.commentRepository.delete(id)).affected > 0;
  }
}
