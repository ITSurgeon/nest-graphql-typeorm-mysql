import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comments/entities/comment.entity';
import { CreateCommentInput } from 'src/comments/inputs/create-comment.input';
import { PostService } from 'src/posts/services/post/post.service';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    private readonly postService: PostService,
  ) {}

  createComment(definition: CreateCommentInput): Promise<CommentEntity> {
    const { postId, ...commentData } = definition;
    const post = this.postService.getPost(postId);
    if (!post) throw new Error(`Post with ID ${postId} not found`);
    const newComment = this.commentRepository.create({
      ...commentData,
      post: { id: postId },
    });

    return this.commentRepository.save(newComment);
  }

  async getComments(): Promise<CommentEntity[]> {
    return await this.commentRepository.find();
  }

  async getComment(id: number): Promise<CommentEntity> {
    return await this.commentRepository.findOneBy({ id });
  }

  async deleteComment(id: number): Promise<boolean> {
    return (await this.commentRepository.delete(id)).affected > 0;
  }
}
