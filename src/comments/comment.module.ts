import { Module } from '@nestjs/common';
import { CommentEntity } from './dto/comment.dto';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService, CommentResolver],
})
export class CommentsModule {}
