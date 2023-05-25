import { Module } from '@nestjs/common';
import { CommentEntity } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './services/comment/comment.service';
import { CommentResolver } from './resolvers/post/comment.resolver';
import { PostService } from 'src/posts/services/post/post.service';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity]), PostsModule],
  providers: [CommentService, CommentResolver, PostsModule],
})
export class CommentsModule {}
