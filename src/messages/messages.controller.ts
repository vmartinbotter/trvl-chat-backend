import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('conversations/:conversationId/messages')
export class MessagesController {
    constructor(private messagesService: MessagesService) {}

    // Enviar un mensaje
    @Post()
    async sendMessage(
        @Param('conversationId') conversationId: string,
        @Body('content') content: string,
    ) {
        const conversationIdNumber = Number(conversationId);
        return this.messagesService.sendMessage(conversationIdNumber, content);
    }

    // Obtener todos los mensajes de una conversación
    @Get()
    async getMessages(@Param('conversationId') conversationId: string) {
        const conversationIdNumber = Number(conversationId);
        return this.messagesService.getMessages(conversationIdNumber);
    }
}
