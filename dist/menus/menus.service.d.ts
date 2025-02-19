import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
export declare class MenusService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createMenuDto: CreateMenuDto): Promise<{
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<{
        parent: {
            name: string;
            parentId: string | null;
            id: string;
            depth: number;
            createdAt: Date;
            updatedAt: Date;
        };
        children: {
            name: string;
            parentId: string | null;
            id: string;
            depth: number;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateMenuDto: UpdateMenuDto): Promise<{
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        name: string;
        parentId: string | null;
        id: string;
        depth: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    saveCurrentState(): Promise<any>;
}
