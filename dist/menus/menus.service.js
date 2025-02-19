"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenusService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let MenusService = class MenusService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createMenuDto) {
        const { name, parentId } = createMenuDto;
        let depth = 0;
        if (parentId) {
            const parent = await this.prisma.menuItem.findUnique({
                where: { id: parentId },
            });
            if (!parent) {
                throw new common_1.NotFoundException(`Parent menu with ID ${parentId} not found`);
            }
            depth = parent.depth + 1;
        }
        return this.prisma.menuItem.create({
            data: {
                name,
                parentId,
                depth,
            },
        });
    }
    async findAll() {
        const allMenuItems = await this.prisma.menuItem.findMany({
            include: {
                children: true,
            },
        });
        const rootItems = allMenuItems.filter(item => !item.parentId);
        const buildHierarchy = (items) => {
            return items.map(item => ({
                ...item,
                children: allMenuItems
                    .filter(child => child.parentId === item.id)
                    .map(child => buildHierarchy([child])[0]),
            }));
        };
        return buildHierarchy(rootItems);
    }
    async findOne(id) {
        const menuItem = await this.prisma.menuItem.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
            },
        });
        if (!menuItem) {
            throw new common_1.NotFoundException(`Menu item with ID ${id} not found`);
        }
        return menuItem;
    }
    async update(id, updateMenuDto) {
        const { name, parentId } = updateMenuDto;
        let depth;
        if (parentId) {
            const parent = await this.prisma.menuItem.findUnique({
                where: { id: parentId },
            });
            if (!parent) {
                throw new common_1.NotFoundException(`Parent menu with ID ${parentId} not found`);
            }
            depth = parent.depth + 1;
        }
        return this.prisma.menuItem.update({
            where: { id },
            data: {
                name,
                parentId,
                ...(depth !== undefined && { depth }),
            },
        });
    }
    async remove(id) {
        const children = await this.prisma.menuItem.findMany({
            where: { parentId: id },
        });
        for (const child of children) {
            await this.remove(child.id);
        }
        return this.prisma.menuItem.delete({
            where: { id },
        });
    }
    async saveCurrentState() {
        const currentState = await this.findAll();
        return currentState;
    }
};
exports.MenusService = MenusService;
exports.MenusService = MenusService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MenusService);
//# sourceMappingURL=menus.service.js.map