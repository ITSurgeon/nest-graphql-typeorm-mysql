import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/posts/entities/post.entity';
import { PostService } from './services/post/post.service';
import { PostResolver } from './resolvers/post/post.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService, PostResolver],
})
export class PostsModule {}
