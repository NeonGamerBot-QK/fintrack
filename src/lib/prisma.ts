// src/lib/server/prisma.ts
import { PrismaClient } from "@prisma/client";
//@ts-ignore
export const prisma = globalThis.prisma ? globalThis.prisma : globalThis.prisma =  new PrismaClient();
