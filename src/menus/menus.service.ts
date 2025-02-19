import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuDto: CreateMenuDto) {
    const { name, parentId } = createMenuDto;
    
    let depth = 0;
    if (parentId) {
      const parent = await this.prisma.menuItem.findUnique({
        where: { id: parentId },
      });
      if (!parent) {
        throw new NotFoundException(`Parent menu with ID ${parentId} not found`);
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

    // Build hierarchical structure
    const rootItems = allMenuItems.filter(item => !item.parentId);
    const buildHierarchy = (items: any[]) => {
      return items.map(item => ({
        ...item,
        children: allMenuItems
          .filter(child => child.parentId === item.id)
          .map(child => buildHierarchy([child])[0]),
      }));
    };

    return buildHierarchy(rootItems);
  }

  async findOne(id: string) {
    const menuItem = await this.prisma.menuItem.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
      },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }

  async update(id: string, updateMenuDto: UpdateMenuDto) {
    const { name, parentId } = updateMenuDto;

    let depth;
    if (parentId) {
      const parent = await this.prisma.menuItem.findUnique({
        where: { id: parentId },
      });
      if (!parent) {
        throw new NotFoundException(`Parent menu with ID ${parentId} not found`);
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

  async remove(id: string) {
    // First, recursively delete all children
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
    // This method could be used to create a snapshot or backup of the current menu hierarchy
    const currentState = await this.findAll();
    // You could save this state to a separate table or external storage if needed
    return currentState;
  }
}