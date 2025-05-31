"use server";

import { MonthlyActiveUserRecord, UserActivity } from "@/types";
import { db } from "./firebase";
import { format, subMonths, parseISO } from "date-fns";

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

    monthlyUsers[monthStr].add(activity.userId);
  });

  result.forEach((item) => {
    const uniqueUsers = monthlyUsers[item.month] || new Set();

    item.activeUsers = uniqueUsers.size;
  });

  return result as MonthlyActiveUserRecord[];
};

export const getActiveUsersFromMonths = async (months = 6) => {
  try {
    const now = new Date();
    const startDate = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999)
    ).toISOString();
    const endMonthsAgo = subMonths(now, months);
    const endDate = new Date(
      Date.UTC(endMonthsAgo.getUTCFullYear(), endMonthsAgo.getUTCMonth(), 1)
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
