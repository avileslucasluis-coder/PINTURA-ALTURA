import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type PageView = {
  id: string;
  path: string;
  createdAt: string;
};

const pageViews: PageView[] = [];

// Public endpoint to record a page view
export async function POST(req: Request) {
  try {
    const { path } = await req.json();

    const targetPath = path && typeof path === "string" ? path : "/";
    const view: PageView = {
      id: `view-${Date.now()}`,
      path: targetPath,
      createdAt: new Date().toISOString()
    };

    pageViews.push(view);

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
    const totalViews = pageViews.length;
    const viewsByPath = Object.entries(
      pageViews.reduce<Record<string, number>>((acc, view) => {
        acc[view.path] = (acc[view.path] || 0) + 1;
        return acc;
      }, {})
    ).map(([path, count]) => ({ path, count }));

    const viewsByDay: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toISOString().split("T")[0];
      viewsByDay[dateString] = 0;
    }

    pageViews.forEach((view) => {
      const dateString = view.createdAt.split("T")[0];
      if (viewsByDay[dateString] !== undefined) {
        viewsByDay[dateString] += 1;
      }
    });

    const dailyStats = Object.entries(viewsByDay).map(([date, count]) => ({
      date,
      count
    }));

    return NextResponse.json({
      totalViews,
      viewsByPath,
      dailyStats
    });
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
