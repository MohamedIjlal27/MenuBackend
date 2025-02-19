import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenusService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createMenuDto: CreateMenuDto): Promise<{
        id: string;
        name: string;
        parentId: string | null;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<{
        parent: {
            id: string;
            name: string;
            parentId: string | null;
            depth: number;
            createdAt: Date;
            updatedAt: Date;
        };
        children: {
            id: string;
            name: string;
            parentId: string | null;
            depth: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        name: string;
        parentId: string | null;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateMenuDto: UpdateMenuDto): Promise<{
        id: string;
        name: string;
        parentId: string | null;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        parentId: string | null;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    saveCurrentState(): Promise<any>;
}
