"use server";

import { MonthlyActiveUserRecord, UserActivity } from "@/types";
import { db } from "./firebase";
import { format, parseISO } from "date-fns";

export const calculateMonthlyActiveUsers = async (
  activities: UserActivity[],
  months: number = 6
) => {
  const now = new Date();
  const result = [];
  for (let i = months - 1; i >= 0; i--) {
    // Use UTC for consistent timezone handling
    const utcDate = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - i, 1)
    );
    const monthStr = format(utcDate, "MMMM");

    result.push({
      month: monthStr,
      activeUsers: 0,
    });
  }

  const monthlyUsers: Record<string, Set<string>> = {};
  activities.forEach((activity) => {
    const date = parseISO(activity.createdAt);
    // Since the date is already in UTC format, format it directly
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
    // Calculate start date (end of current month in UTC)
    const startDate = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999)
    ).toISOString();

    // Calculate end date (start of the month N months ago in UTC)
    const endDate = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - months + 1, 1)
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
