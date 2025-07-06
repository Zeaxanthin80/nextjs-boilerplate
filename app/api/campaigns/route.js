import { NextResponse } from "next/server";
import { auth } from "../../lib/auth";
import { prisma } from "../../lib/prisma";

export async function GET(request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = parseInt(searchParams.get("offset")) || 0;

    const campaigns = await prisma.campaign.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        content: {
          select: {
            id: true,
            platform: true,
            contentType: true,
            title: true,
          },
        },
        _count: {
          select: {
            content: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: limit,
      skip: offset,
    });

    const total = await prisma.campaign.count({
      where: {
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      campaigns,
      total,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
