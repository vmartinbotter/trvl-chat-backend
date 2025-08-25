import { Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
    providers: [ConversationsService, PrismaService],
    exports: [ConversationsService],
})
export class ConversationsModule {}
