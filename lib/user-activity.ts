"use server";

import { ActiveUserRecord, MonthlyActiveUserRecord, User } from "@/types";
import { db } from "./firebase";
import { format, subMonths, parseISO } from "date-fns";
import { unstable_cache } from "next/cache";

export const calculateMonthlyActiveUsers = async (
  activities: ActiveUserRecord[],
  months: number = 6,
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
    const date = parseISO(activity.lastLoginAt);
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
      format(subMonths(date, months), "yyyy-MM-dd"),
    ).toISOString();

    const snapshot = await db
      .collection("users")
      .where("lastLoginAt", "<=", startDate)
      .where("lastLoginAt", ">=", endDate)
      .where("role", "!=", "admin")
      .get();

    const activeUsers = snapshot.docs.map((doc) => {
      const data = doc.data() as User;

      return {
        id: doc.id,
        lastLoginAt: data.lastLoginAt,
      } as ActiveUserRecord;
    });
    const monthlyActiveUsers = await calculateMonthlyActiveUsers(activeUsers);

    return { success: { activeUsers, monthlyActiveUsers } };
  } catch (error) {
    console.error("Error fetching monthly active data: " + error);

    return { error };
  }
};
