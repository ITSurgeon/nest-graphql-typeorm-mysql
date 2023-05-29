import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/dto/post.dto';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostsModule {}
