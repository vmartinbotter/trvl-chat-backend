import { Injectable } from '@nestjs/common';
// @ts-ignore
import { PrismaService } from '../prisma.service';

@Injectable()
export class ConversationsService {
    constructor(private prisma: PrismaService) {}

    async createConversation(title?: string) {
        return this.prisma.conversation.create({
            data: {
                title: title || 'Nueva conversación',
            },
        });
    }

    async getConversations() {
        return this.prisma.conversation.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc',
                    },
                    take: 1,
                },
            },
        });
    }

    async getConversationById(id: number) {
        return this.prisma.conversation.findUnique({
            where: { id },
            include: {
                messages: {
                    orderoBy: {
                        createdAt: 'asc',
                    },
                },
            },
        });
    }

    async deleteConversation(id: number) {
        return this.prisma.conversation.delete({
            where: { id },
        });
    }
}
