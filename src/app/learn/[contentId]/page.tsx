"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChange } from "~/lib/firebase-auth";
import { LearningClient } from "./components/LearningClient";
import type { User } from "firebase/auth";

interface PageProps {
  params: Promise<{
    contentId: string;
  }>;
}

export default function LearnPage({ params }: PageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentId, setContentId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setContentId(resolvedParams.contentId);
    };
    
    void getParams();
  }, [params]);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
      
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <LearningClient contentId={contentId} />
    </div>
  );
}
