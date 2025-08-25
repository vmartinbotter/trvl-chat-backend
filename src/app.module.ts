import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { ConversationsModule } from './conversations/conversations.module';

@Module({
    imports: [MessagesModule, ConversationsModule],
})
export class AppModule {}
