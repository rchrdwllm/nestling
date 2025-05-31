"use server";

import { MonthlyActiveUserRecord, User, UserActivity } from "@/types";
import { db } from "./firebase";
import { format, subMonths, parseISO } from "date-fns";
import { unstable_cache } from "next/cache";

export const calculateMonthlyActiveUsers = async (
  activities: UserActivity[],
  months: number = 6
) => {
  const now = new Date();
  const result = [];

  for (let i = months - 1; i >= 0; i--) {
    const date = subMonths(now, i);
    const monthStr = format(date, "MMMM");

    result.push({
      month: monthStr,
      activeUsers: 0,
    });
  }

  const monthlyUsers: Record<string, Set<string>> = {};

  activities.forEach((activity) => {
    const date = parseISO(activity.createdAt);
    const monthStr = format(date, "MMMM");

    if (!monthlyUsers[monthStr]) {
      monthlyUsers[monthStr] = new Set();
    }

    monthlyUsers[monthStr].add(activity.id);
  });

  result.forEach((item) => {
    const uniqueUsers = monthlyUsers[item.month] || new Set();

    item.activeUsers = uniqueUsers.size;
  });

  return result as MonthlyActiveUserRecord[];
};

export const getActiveUsersFromMonths = async (months = 6) => {
  try {
    const date = new Date();
    const startDate = new Date(format(date, "yyyy-MM-dd")).toISOString();
    const endDate = new Date(
      format(subMonths(date, months), "yyyy-MM-dd")
    ).toISOString();

    const snapshot = await db
      .collection("userActivities")
      .where("createdAt", ">=", endDate)
      .where("createdAt", "<=", startDate)
      .where("type", "==", "login")
      .get();

    const activeUsers = snapshot.docs.map((doc) => doc.data() as UserActivity);
    const monthlyActiveUsers = await calculateMonthlyActiveUsers(activeUsers);

    return { success: { activeUsers, monthlyActiveUsers } };
  } catch (error) {
    console.error("Error fetching monthly active data: " + error);

    return { error };
  }
};
