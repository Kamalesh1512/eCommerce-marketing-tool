// src/app/(protected)/settings/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface BrandProfile {
  id: string;
  user_id: string;
  company_name: string;
  revenue_bracket?: string | null;
  platform?: string | null;
  currency: string;
  brand_tone_sample?: string | null;
  primary_audience?: string | null;
  skus_count: number;
  created_at: string;
  updated_at: string;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const [brandProfile, setBrandProfile] = useState<BrandProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchBrandProfile(): Promise<BrandProfile | null> {
    try {
      const res = await fetch("/api/brand-profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 401) {
          return null;
        }
        throw new Error("Failed to fetch brand profile");
      }

      const data = await res.json();
      return data as BrandProfile;
    } catch (error) {
      console.error("Error fetching brand profile:", error);
      return null;
    }
  }

  useEffect(() => {
    if (status === "authenticated") {
      (async () => {
        setLoading(true);
        const profile = await fetchBrandProfile();
        setBrandProfile(profile);
        setLoading(false);
      })();
    }
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 pb-20 md:pb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and brand settings
        </p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="brand">Brand Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                View and manage your account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={session?.user?.name || ""}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={session?.user?.email || ""}
                    disabled
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Plan</p>
                    <p className="text-sm text-muted-foreground">
                      Current subscription plan
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {session?.user?.plan || "Free"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Account Status</p>
                    <p className="text-sm text-muted-foreground">
                      Your account is active
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-600 dark:text-green-400">
                    Active
                  </span>
                </div>

                {session?.user?.isAdmin && (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">Role</p>
                      <p className="text-sm text-muted-foreground">
                        Administrative access
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      Admin
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex gap-4">
                <Button variant="outline">Change Password</Button>
                <Button variant="outline">Update Email</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brand Profile Tab */}
        <TabsContent value="brand" className="space-y-6">
          {brandProfile ? (
            <Card>
              <CardHeader>
                <CardTitle>Brand Profile</CardTitle>
                <CardDescription>
                  Your brand information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={brandProfile.company_name}
                      disabled
                    />
                  </div>

                  {brandProfile.platform && (
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Input
                        id="platform"
                        value={brandProfile.platform}
                        disabled
                      />
                    </div>
                  )}

                  {brandProfile.revenue_bracket && (
                    <div className="space-y-2">
                      <Label htmlFor="revenue">Revenue Bracket</Label>
                      <Input
                        id="revenue"
                        value={brandProfile.revenue_bracket}
                        disabled
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input
                      id="currency"
                      value={brandProfile.currency}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skus">Products (SKUs)</Label>
                    <Input
                      id="skus"
                      value={brandProfile.skus_count}
                      disabled
                    />
                  </div>
                </div>

                {brandProfile.primary_audience && (
                  <div className="space-y-2">
                    <Label htmlFor="audience">Primary Audience</Label>
                    <Textarea
                      id="audience"
                      value={brandProfile.primary_audience}
                      disabled
                      rows={3}
                    />
                  </div>
                )}

                {brandProfile.brand_tone_sample && (
                  <div className="space-y-2">
                    <Label htmlFor="tone">Brand Tone Sample</Label>
                    <Textarea
                      id="tone"
                      value={brandProfile.brand_tone_sample}
                      disabled
                      rows={4}
                    />
                  </div>
                )}

                <Separator />

                <div className="flex gap-4">
                  <Button>Edit Profile</Button>
                  <Button variant="outline">Reset</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Brand Profile</CardTitle>
                <CardDescription>
                  No brand profile found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Create a brand profile to get started with personalized marketing tools.
                </p>
                <Button>Create Brand Profile</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email updates about your campaigns
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Marketing Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Get tips and insights about marketing
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Product Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Be notified of new features and improvements
                    </p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>

              <Separator />

              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}