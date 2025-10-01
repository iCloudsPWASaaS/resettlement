import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const website = await prisma.website.findFirst({
      include: {
        services: {
          where: { isActive: true },
          orderBy: { order: 'asc' }
        },
        gallery: {
          where: { isActive: true },
          orderBy: { order: 'asc' }
        }
      }
    });
    return NextResponse.json(website);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch website information' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { address, email, telephone, description } = await request.json();

    // Check if website info already exists
    const existingWebsite = await prisma.website.findFirst();

    let website;
    if (existingWebsite) {
      // Update existing website info
      website = await prisma.website.update({
        where: { id: existingWebsite.id },
        data: { address, email, telephone, description },
        include: {
          services: {
            where: { isActive: true },
            orderBy: { order: 'asc' }
          },
          gallery: {
            where: { isActive: true },
            orderBy: { order: 'asc' }
          }
        }
      });
    } else {
      // Create new website info
      website = await prisma.website.create({
        data: { address, email, telephone, description },
        include: {
          services: {
            where: { isActive: true },
            orderBy: { order: 'asc' }
          },
          gallery: {
            where: { isActive: true },
            orderBy: { order: 'asc' }
          }
        }
      });
    }

    return NextResponse.json(website);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save website information' }, { status: 500 });
  }
}