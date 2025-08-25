import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ConversationsService } from './conversations.service';

@Controller('conversations')
export class ConversationsController {
    constructor(private conversationsService: ConversationsService) {}

    @Post()
    create(@Body('title') title?: string) {
        return this.conversationsService.createConversation(title);
    }

    @Get()
    findAll() {
        return this.conversationsService.getConversations();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.conversationsService.getConversationById(Number(id));
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.conversationsService.deleteConversation(Number(id));
    }
}
