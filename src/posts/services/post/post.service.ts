import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/entities/post.entity';
import { CreatePostInput } from 'src/posts/inputs/create-post.input';
import { UpdatePostInput } from 'src/posts/inputs/update-post.input';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  async createPost(userInput: CreatePostInput): Promise<PostEntity> {
    return await this.postRepository.save(userInput);
  }

  async getPosts(): Promise<PostEntity[]> {
    return await this.postRepository.find();
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

  async deletePost(id: number): Promise<number> {
    await this.postRepository.delete(id);
    return id;
  }
}
