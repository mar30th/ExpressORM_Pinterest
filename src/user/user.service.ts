import { Injectable } from '@nestjs/common';
import { PrismaClient, user } from '@prisma/client';

@Injectable()
export class UserService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getUser(): Promise<user[]> {
        const data = await this.prisma.user.findMany();
        return data;
    }
}
