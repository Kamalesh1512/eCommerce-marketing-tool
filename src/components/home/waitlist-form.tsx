import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { motion } from "framer-motion";

// Waitlist Form Component
export const WaitlistForm = ({
  inline = false,
  onSuccess,
}: {
  inline?: boolean;
  onSuccess?: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/waitlist-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.alreadyExists) {
          setError("This email is already on the waitlist!");
        } else {
          setError(data.error || "Failed to join waitlist");
        }
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setEmail("");
      if (onSuccess) onSuccess();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error("Waitlist error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
      >
        <CheckCircle2 className="w-5 h-5 text-green-500" />
        <div>
          <p className="font-semibold text-green-700 dark:text-green-400">
            You're on the list!
          </p>
          <p className="text-sm text-muted-foreground">
            We'll notify you when we launch.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={inline ? "flex gap-3" : "space-y-3"}
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
      />
      <Button type="submit" disabled={loading} className="whitespace-nowrap">
        {loading ? "Joining..." : "Join Waitlist"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </form>
  );
};
