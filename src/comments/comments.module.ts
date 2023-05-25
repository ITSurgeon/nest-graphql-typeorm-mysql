import { Module } from '@nestjs/common';
import { CommentEntity } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './services/comment/comment.service';
import { CommentResolver } from './resolvers/post/comment.resolver';
import { PostService } from 'src/posts/services/post/post.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService, CommentResolver, PostService],
})
export class CommentsModule {}
