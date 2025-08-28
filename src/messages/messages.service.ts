import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private prisma: PrismaService) {}

    async sendMessage(conversationId: number, content: string) {
        // 1. Guardar mensaje del usuario
        await this.prisma.message.create({
            data: { conversationId, role: 'user', content },
        });

        try {
            // 2. Llamar a Gemini con fetch
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
                    },
                    body: JSON.stringify({
                        contents: [{ role: 'user', parts: [{ text: content }] }],
                    }),
                },
            );

            if (response.status === 429) {
                throw new HttpException(
                    'Límite de peticiones a Gemini alcanzado. Intenta más tarde.',
                    HttpStatus.TOO_MANY_REQUESTS,
                );
            }

            if (!response.ok) {
                throw new HttpException(
                    `Error en Gemini: ${response.statusText}`,
                    HttpStatus.BAD_GATEWAY,
                );
            }

            const data = await response.json();

            const assistantText =
                data?.candidates?.[0]?.content?.parts?.[0]?.text ||
                'Lo siento, no pude generar respuesta.';

            // 3. Guardar respuesta del assistant
            await this.prisma.message.create({
                data: { conversationId, role: 'assistant', content: assistantText },
            });

            // 4. Retornar historial completo
            return this.getMessages(conversationId);
        } catch (error: any) {
            if (error instanceof HttpException) throw error;

            throw new HttpException(
                'Error al conectar con Gemini',
                HttpStatus.BAD_GATEWAY,
            );
        }
    }

    async getMessages(conversationId: number) {
        return this.prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'asc' },
        });
    }
}
