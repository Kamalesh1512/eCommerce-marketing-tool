import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";



// Waitlist Stats Component
export const WaitlistStats = () => {
  const [stats, setStats] = useState({
    count: 0,
    remaining: 100,
    percentage: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/waitlist-form");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Refresh stats once every 24 hours (24 * 60 * 60 * 1000 ms)
    const interval = setInterval(fetchStats, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="pt-6 border-t mt-8 animate-pulse">
        <div className="h-4 bg-muted rounded w-48 mx-auto mb-2"></div>
        <div className="w-full bg-muted h-2 rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="pt-6 border-t mt-8">
      <p className="text-sm text-muted-foreground">
        Early bird spots remaining:{" "}
        <span className="font-bold text-primary">{stats.remaining}/100</span>
      </p>
      <div className="w-full bg-muted h-2 rounded-full mt-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${stats.percentage}%` }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-full bg-gradient-to-r from-primary to-purple-600"
        />
      </div>
    </div>
  );
};
