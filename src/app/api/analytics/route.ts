import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Public endpoint to record a page view
export async function POST(req: Request) {
  try {
    const { path } = await req.json();
    
    // Simple verification to prevent spam of empty paths
    const targetPath = path && typeof path === "string" ? path : "/";

    const view = await prisma.pageView.create({
      data: {
        path: targetPath
      }
    });

    return NextResponse.json({ success: true, id: view.id });
  } catch (error) {
    console.error("Error recording page view:", error);
    return NextResponse.json({ error: "Failed to record page view" }, { status: 500 });
  }
}

// Protected endpoint to fetch analytics (total views and daily views)
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Total views
    const totalViews = await prisma.pageView.count();

    // Group by path
    const viewsByPath = await prisma.pageView.groupBy({
      by: ["path"],
      _count: {
        id: true
      }
    });

    // Group by date (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentViews = await prisma.pageView.findMany({
      where: {
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      select: {
        createdAt: true
      }
    });

    // Count views per day
    const viewsByDay: Record<string, number> = {};
    // Initialize last 7 days with 0
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split("T")[0];
      viewsByDay[dateString] = 0;
    }

    recentViews.forEach((v) => {
      const dateString = v.createdAt.toISOString().split("T")[0];
      if (viewsByDay[dateString] !== undefined) {
        viewsByDay[dateString]++;
      }
    });

    const dailyStats = Object.keys(viewsByDay).map(date => ({
      date,
      count: viewsByDay[date]
    }));

    return NextResponse.json({
      totalViews,
      viewsByPath: viewsByPath.map(item => ({
        path: item.path,
        count: item._count.id
      })),
      dailyStats
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
