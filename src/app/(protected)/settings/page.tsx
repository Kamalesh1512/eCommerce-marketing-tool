// src/app/(protected)/settings/page.tsx
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  Globe,
  DollarSign,
  Package,
  MessageSquare,
  Users,
  Target,
  TrendingUp,
  Sparkles,
  Edit,
  Save,
  X,
  FileText,
  Zap,
  Facebook,
  Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CreateBrandProfileRequest } from "@/lib/db/types";

// Import onboarding components
import { TagInput } from "@/components/onboarding/onboarding-tagInput";
import { MultiSelectCountries } from "@/components/onboarding/onboarding-selectCountries";
import { InfoHoverCard } from "@/components/onboarding/onboarding-infoHoverCard";

// Import constants from onboarding
import {
  brandTones,
  coreValuesOptions,
  audienceSuggestions,
  painPointSuggestions,
  marketingChannels,
  currencies,
  platforms,
  revenueBrackets,
  infoContent,
} from "@/lib/constants/onboarding";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [brandProfile, setBrandProfile] =
    useState<CreateBrandProfileRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<
    Partial<CreateBrandProfileRequest>
  >({});

  async function fetchBrandProfile() {
    try {
      const res = await fetch("/api/brand-profile", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch brand profile");
      }

      const data = await res.json();
      return (data.brandProfile ?? null) as CreateBrandProfileRequest | null;
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
        setEditedProfile(profile || {});
        setLoading(false);
      })();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const handleEdit = () => {
    setEditing(true);
    setEditedProfile(brandProfile || {});
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedProfile(brandProfile || {});
  };

  const handleChange = (name: string, value: any) => {
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArrayValue = (arrayName: string, value: string) => {
    setEditedProfile((prev) => {
      const array = (prev[arrayName as keyof typeof prev] as string[]) || [];
      const newArray = array.includes(value)
        ? array.filter((item) => item !== value)
        : [...array, value];
      return { ...prev, [arrayName]: newArray };
    });
  };

  const getCurrencySymbol = () => {
    const curr = currencies.find(
      (c) => c.value === (editedProfile.currency || brandProfile?.currency)
    );
    return curr?.symbol || "$";
  };

  const handleSave = async () => {
    try {
      const payload: any = { ...editedProfile };

      // console.log(payload);

      payload.targetMarketLocation = Array.isArray(payload.targetMarketLocation)
        ? payload.targetMarketLocation
        : payload.targetMarketLocation
        ? [payload.targetMarketLocation]
        : [];

      payload.primaryAudience = Array.isArray(payload.primaryAudience)
        ? payload.primaryAudience
        : payload.primaryAudience
        ? [payload.primaryAudience]
        : [];

      // Convert skusCount to integer if present
      if (
        payload.skusCount !== undefined &&
        payload.skusCount !== null &&
        payload.skusCount !== ""
      ) {
        payload.skusCount = Number(payload.skusCount);
        if (Number.isNaN(payload.skusCount)) payload.skusCount = 0;
      }

      // averageOrderValue to number
      if (
        payload.averageOrderValue !== undefined &&
        payload.averageOrderValue !== null &&
        payload.averageOrderValue !== ""
      ) {
        const parsed = Number(payload.averageOrderValue);
        payload.averageOrderValue = Number.isNaN(parsed) ? null : parsed;
      }

      const res = await fetch("/api/brand-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setBrandProfile(data.brandProfile);
        setEditedProfile(data.brandProfile || {});
        setEditing(false);
        alert("Profile updated successfully!");
      } else {
        throw new Error(data.error || "Failed to update profile");
      }
    } catch (error: any) {
      alert(error.message || "Failed to update profile");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 pb-20 md:pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account and brand profile
          </p>
        </div>
        {brandProfile && !editing && (
          <Button onClick={handleEdit} className="gap-2">
            <Edit className="w-4 h-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="brand">Brand Profile</TabsTrigger>
          <TabsTrigger value="usage">Usage & Billing</TabsTrigger>
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
                  <Input id="name" value={session?.user?.name || ""} disabled />
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
                    <p className="font-medium">Subscription Plan</p>
                    <p className="text-sm text-muted-foreground">
                      Current subscription tier
                    </p>
                  </div>
                  <Badge variant="default" className="text-sm px-3 py-1">
                    Free Plan
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Account Status</p>
                    <p className="text-sm text-muted-foreground">
                      Your account is active and verified
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-sm px-3 py-1 bg-green-500/10 text-green-600 border-green-200"
                  >
                    Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Onboarding Status</p>
                    <p className="text-sm text-muted-foreground">
                      Brand profile setup completion
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-sm px-3 py-1",
                      session?.user?.hasCompletedOnboarding
                        ? "bg-green-500/10 text-green-600 border-green-200"
                        : "bg-yellow-500/10 text-yellow-600 border-yellow-200"
                    )}
                  >
                    {session?.user?.hasCompletedOnboarding
                      ? "Completed"
                      : "Incomplete"}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="flex gap-4">
                <Button variant="outline">Change Password</Button>
                <Button
                  variant="outline"
                  className="text-destructive hover:text-destructive"
                >
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Brand Profile Tab */}
        <TabsContent value="brand" className="space-y-6">
          {brandProfile ? (
            <>
              {/* Business Foundation */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    <CardTitle>Business Foundation</CardTitle>
                  </div>
                  <CardDescription>
                    Core company information and details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Company Name - Not Editable */}
                    <div className="space-y-2">
                      <Label htmlFor="companyName">
                        Company Name
                        <InfoHoverCard info={infoContent["companyName"]} />
                      </Label>
                      <Input
                        id="companyName"
                        value={brandProfile.companyName ?? ""}
                        disabled
                      />
                    </div>

                    {/* Website URL - Not Editable */}
                    <div className="space-y-2">
                      <Label htmlFor="websiteUrl">
                        Website URL
                        <InfoHoverCard info={infoContent["websiteUrl"]} />
                      </Label>
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <Input
                          id="websiteUrl"
                          value={brandProfile.websiteUrl ?? ""}
                          disabled
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    {/* Brand Category - Editable with Select */}
                    <div className="space-y-2">
                      <Label htmlFor="brandCategory">
                        Industry / Category
                        <InfoHoverCard info={infoContent["brandCategory"]} />
                      </Label>
                      {editing ? (
                        <Input
                          id="brandCategory"
                          value={(editedProfile.brandCategory as string) ?? ""}
                          onChange={(e) =>
                            handleChange("brandCategory", e.target.value)
                          }
                          placeholder="e.g., Travel Gear & Accessories"
                        />
                      ) : (
                        <Input
                          value={brandProfile.brandCategory ?? ""}
                          disabled
                        />
                      )}
                    </div>

                    {/* SKUs Count - Editable */}
                    <div className="space-y-2">
                      <Label htmlFor="skusCount">
                        Number of SKUs
                        <InfoHoverCard info={infoContent["skusCount"]} />
                      </Label>
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-muted-foreground" />
                        <Input
                          id="skusCount"
                          type="number"
                          value={
                            editing
                              ? editedProfile.skusCount !== undefined &&
                                editedProfile.skusCount !== null
                                ? String(editedProfile.skusCount)
                                : ""
                              : String(brandProfile.skusCount ?? 0)
                          }
                          onChange={(e) =>
                            handleChange(
                              "skusCount",
                              e.target.value === "" ? 0 : Number(e.target.value)
                            )
                          }
                          disabled={!editing}
                          min={0}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Business Metrics */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <CardTitle>Business Metrics</CardTitle>
                  </div>
                  <CardDescription>
                    Revenue, platform, and operational data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Currency - Editable with Select */}
                    <div className="space-y-2">
                      <Label>
                        Currency
                        <InfoHoverCard info={infoContent["currency"]} />
                      </Label>
                      {editing ? (
                        <Select
                          value={
                            (editedProfile.currency as string) ||
                            brandProfile.currency ||
                            "USD"
                          }
                          onValueChange={(val) => handleChange("currency", val)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your currency" />
                          </SelectTrigger>
                          <SelectContent>
                            {currencies.map((c) => (
                              <SelectItem key={c.value} value={c.value}>
                                {c.flag} {c.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          value={brandProfile.currency ?? "USD"}
                          disabled
                        />
                      )}
                    </div>

                    {/* Revenue Bracket - Editable with Select */}
                    <div className="space-y-2">
                      <Label>
                        Annual Revenue
                        <InfoHoverCard info={infoContent["revenueBracket"]} />
                      </Label>
                      {editing ? (
                        <Select
                          value={
                            (editedProfile.revenueBracket as string) ||
                            brandProfile.revenueBracket ||
                            ""
                          }
                          onValueChange={(val) =>
                            handleChange("revenueBracket", val)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a range" />
                          </SelectTrigger>
                          <SelectContent>
                            {revenueBrackets.map((b) => (
                              <SelectItem key={b} value={b}>
                                {b}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          value={brandProfile.revenueBracket ?? "Not specified"}
                          disabled
                        />
                      )}
                    </div>

                    {/* Platform - Editable with Select */}
                    <div className="space-y-2">
                      <Label>
                        E-commerce Platform
                        <InfoHoverCard info={infoContent["platform"]} />
                      </Label>
                      {editing ? (
                        <Select
                          value={
                            (editedProfile.platform as string) ||
                            brandProfile.platform ||
                            ""
                          }
                          onValueChange={(val) => handleChange("platform", val)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select your platform" />
                          </SelectTrigger>
                          <SelectContent>
                            {platforms.map((p) => (
                              <SelectItem key={p.value} value={p.value}>
                                {p.icon} {p.value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          value={brandProfile.platform ?? "Not specified"}
                          disabled
                        />
                      )}
                    </div>
                  </div>

                  {/* Target Markets - Editable with MultiSelectCountries */}
                  <div className="space-y-2">
                    <Label>
                      Target Markets
                      <InfoHoverCard
                        info={infoContent["targetMarketLocation"]}
                      />
                    </Label>
                    {editing ? (
                      <MultiSelectCountries
                        value={
                          Array.isArray(editedProfile.targetMarketLocation)
                            ? editedProfile.targetMarketLocation
                            : typeof editedProfile.targetMarketLocation ===
                              "string"
                            ? (() => {
                                const val =
                                  editedProfile.targetMarketLocation as string;
                                try {
                                  return JSON.parse(val);
                                } catch {
                                  return val
                                    .replace(/[{}]/g, "")
                                    .split(",")
                                    .map((v) => v.trim())
                                    .filter(Boolean);
                                }
                              })()
                            : Array.isArray(brandProfile.targetMarketLocation)
                            ? brandProfile.targetMarketLocation
                            : typeof brandProfile.targetMarketLocation ===
                              "string"
                            ? (() => {
                                const val =
                                  brandProfile.targetMarketLocation as string;
                                try {
                                  return JSON.parse(val);
                                } catch {
                                  return val
                                    .replace(/[{}]/g, "")
                                    .split(",")
                                    .map((v) => v.trim())
                                    .filter(Boolean);
                                }
                              })()
                            : []
                        }
                        onChange={(markets) =>
                          handleChange("targetMarketLocation", markets)
                        }
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(brandProfile.targetMarketLocation)
                          ? brandProfile.targetMarketLocation
                          : typeof brandProfile.targetMarketLocation ===
                            "string"
                          ? (() => {
                              const val =
                                brandProfile.targetMarketLocation as string;
                              try {
                                // Try parsing as JSON first
                                return JSON.parse(val);
                              } catch {
                                // Fallback for Postgres-style {US,UK}
                                return val
                                  .replace(/[{}]/g, "")
                                  .split(",")
                                  .map((v) => v.trim())
                                  .filter(Boolean);
                              }
                            })()
                          : []
                        ).map((market: string, idx: number) => (
                          <Badge key={idx} variant="secondary">
                            {market}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Brand Identity */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <CardTitle>Brand Identity</CardTitle>
                  </div>
                  <CardDescription>
                    Voice, tone, and personality
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Brand Tone - Editable with Button Toggle */}
                  <div className="space-y-2">
                    <Label>
                      Brand Tone/Personality
                      <InfoHoverCard info={infoContent["brandTone"]} />
                    </Label>
                    {editing ? (
                      <div className="flex flex-wrap gap-3 pt-2">
                        {brandTones.map((tone) => (
                          <Button
                            key={tone.value}
                            variant={
                              (editedProfile.brandTone as string) === tone.value
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              handleChange("brandTone", tone.value)
                            }
                            className="flex items-center gap-2"
                            type="button"
                          >
                            <tone.icon className="w-4 h-4" />
                            {tone.label}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <Badge variant="secondary" className="capitalize">
                        {brandProfile.brandTone ?? "Not set"}
                      </Badge>
                    )}
                    {editing && editedProfile.brandTone && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {
                          brandTones.find(
                            (t) => t.value === editedProfile.brandTone
                          )?.desc
                        }
                      </p>
                    )}
                  </div>

                  {/* Brand Tone Sample - Editable */}
                  <div className="space-y-2">
                    <Label htmlFor="brandToneSample">
                      Brand Tone - Sample Headline/Slogan
                    </Label>
                    {editing ? (
                      <Input
                        id="brandToneSample"
                        value={(editedProfile.brandToneSample as string) ?? ""}
                        onChange={(e) =>
                          handleChange("brandToneSample", e.target.value)
                        }
                        placeholder="e.g. Built for the modern explorer"
                      />
                    ) : (
                      <Textarea
                        value={brandProfile.brandToneSample ?? "Not provided"}
                        disabled
                        rows={2}
                      />
                    )}
                  </div>

                  {/* Core Values - Editable with Button Toggle */}
                  <div className="space-y-2">
                    <Label>
                      Core Values
                      <InfoHoverCard info={infoContent["coreValues"]} />
                    </Label>
                    {editing ? (
                      <div className="flex flex-wrap gap-3 pt-2">
                        {coreValuesOptions.map((v) => (
                          <Button
                            key={v.value}
                            variant={
                              (
                                (editedProfile.coreValues as string[]) || []
                              ).includes(v.value)
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              toggleArrayValue("coreValues", v.value)
                            }
                            className="flex items-center gap-2"
                            type="button"
                          >
                            <span>{v.icon}</span>
                            {v.label}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(brandProfile.coreValues || []).map((value, idx) => (
                          <Badge key={idx} variant="outline">
                            {value}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Brand Keywords - Editable with TagInput */}
                  {/* <div className="space-y-2">
                    <Label>
                      Brand Keywords
                      <InfoHoverCard info={infoContent["brandKeywords"]} />
                    </Label>
                    {editing ? (
                      <TagInput
                        value={
                          (editedProfile.brandKeywords as string[]) ||
                          brandProfile.brandKeywords ||
                          []
                        }
                        onChange={(tags) => handleChange("brandKeywords", tags)}
                        placeholder="Type a keyword and hit enter"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(brandProfile.brandKeywords || []).map(
                          (keyword, idx) => (
                            <Badge key={idx} variant="secondary">
                              {keyword}
                            </Badge>
                          )
                        )}
                      </div>
                    )}
                  </div> */}

                  {/* Dream Outcome - Editable */}
                  {(brandProfile.dreamOutcome || editing) && (
                    <div className="space-y-2">
                      <Label htmlFor="dreamOutcome">Dream Outcome</Label>
                      {editing ? (
                        <Input
                          id="dreamOutcome"
                          value={(editedProfile.dreamOutcome as string) ?? ""}
                          onChange={(e) =>
                            handleChange("dreamOutcome", e.target.value)
                          }
                          placeholder="What outcome do your customers dream of?"
                        />
                      ) : (
                        <Input
                          value={brandProfile.dreamOutcome ?? ""}
                          disabled
                        />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Audience Insights */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <CardTitle>Audience Insights</CardTitle>
                  </div>
                  <CardDescription>
                    Who you serve and their needs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Primary Audience - Editable with TagInput */}
                  <div className="space-y-2">
                    <Label>
                      Primary Audience
                      <InfoHoverCard info={infoContent["primaryAudience"]} />
                    </Label>
                    {editing ? (
                      <TagInput
                        value={
                          Array.isArray(editedProfile.primaryAudience)
                            ? editedProfile.primaryAudience
                            : typeof editedProfile.primaryAudience === "string"
                            ? (() => {
                                const val =
                                  editedProfile.primaryAudience as string;
                                try {
                                  return JSON.parse(val);
                                } catch {
                                  return val
                                    .replace(/[{}]/g, "")
                                    .split(",")
                                    .map((v) => v.trim())
                                    .filter(Boolean);
                                }
                              })()
                            : Array.isArray(brandProfile.primaryAudience)
                            ? brandProfile.primaryAudience
                            : typeof brandProfile.primaryAudience === "string"
                            ? (() => {
                                const val =
                                  brandProfile.primaryAudience as string;
                                try {
                                  return JSON.parse(val);
                                } catch {
                                  return val
                                    .replace(/[{}]/g, "")
                                    .split(",")
                                    .map((v) => v.trim())
                                    .filter(Boolean);
                                }
                              })()
                            : []
                        }
                        onChange={(tags) =>
                          handleChange("primaryAudience", tags)
                        }
                        placeholder="Add audience segments"
                        suggestions={audienceSuggestions}
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(Array.isArray(brandProfile.primaryAudience)
                          ? brandProfile.primaryAudience
                          : typeof brandProfile.primaryAudience === "string"
                          ? (() => {
                              const val =
                                brandProfile.primaryAudience as string;
                              try {
                                return JSON.parse(val);
                              } catch {
                                return val
                                  .replace(/[{}]/g, "")
                                  .split(",")
                                  .map((v) => v.trim())
                                  .filter(Boolean);
                              }
                            })()
                          : []
                        ).map((aud: string, idx: number) => (
                          <Badge key={idx} variant="outline">
                            {aud}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Audience Demographics - Editable */}
                  {(brandProfile.audienceDemographics || editing) && (
                    <div className="space-y-2">
                      <Label htmlFor="audienceDemographics">
                        Audience Demographics (optional)
                      </Label>
                      {editing ? (
                        <Textarea
                          id="audienceDemographics"
                          value={
                            (editedProfile.audienceDemographics as string) ?? ""
                          }
                          onChange={(e) =>
                            handleChange("audienceDemographics", e.target.value)
                          }
                          placeholder="Age, gender, geography, etc."
                          rows={3}
                        />
                      ) : (
                        <Textarea
                          value={brandProfile.audienceDemographics ?? ""}
                          disabled
                          rows={3}
                        />
                      )}
                    </div>
                  )}

                  {/* Pain Points - Editable with TagInput */}
                  {/* <div className="space-y-2">
                    <Label>
                      Customer Pain Points
                      <InfoHoverCard info={infoContent["painPoints"]} />
                    </Label>
                    {editing ? (
                      <TagInput
                        value={
                          (editedProfile.painPoints as string[]) ||
                          brandProfile.painPoints ||
                          []
                        }
                        onChange={(tags) => handleChange("painPoints", tags)}
                        placeholder="Add pain points"
                        suggestions={painPointSuggestions}
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(brandProfile.painPoints || []).map((pain, idx) => (
                          <Badge key={idx} variant="outline">
                            {pain}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div> */}
                </CardContent>
              </Card>

              {/* Value Proposition */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <CardTitle>Value Proposition</CardTitle>
                  </div>
                  <CardDescription>What makes you unique</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* USP - Editable */}
                  {(brandProfile.uniqueSellingProposition || editing) && (
                    <div className="space-y-2">
                      <Label htmlFor="uniqueSellingProposition">
                        Unique Selling Proposition
                      </Label>
                      {editing ? (
                        <Textarea
                          id="uniqueSellingProposition"
                          value={
                            (editedProfile.uniqueSellingProposition as string) ??
                            ""
                          }
                          onChange={(e) =>
                            handleChange(
                              "uniqueSellingProposition",
                              e.target.value
                            )
                          }
                          placeholder="Summarize your main value in one sentence"
                          rows={3}
                        />
                      ) : (
                        <Textarea
                          value={brandProfile.uniqueSellingProposition ?? ""}
                          disabled
                          rows={3}
                        />
                      )}
                    </div>
                  )}

                  {/* Differentiators - Editable with TagInput */}
                  <div className="space-y-2">
                    <Label>
                      Unique Differentiators
                      <InfoHoverCard info={infoContent["differentiators"]} />
                    </Label>
                    {editing ? (
                      <TagInput
                        value={
                          (editedProfile.differentiators as string[]) ||
                          brandProfile.differentiators ||
                          []
                        }
                        onChange={(tags) =>
                          handleChange("differentiators", tags)
                        }
                        placeholder="What sets you apart?"
                        suggestions={[
                          "Lifetime warranty",
                          "Handmade",
                          "Carbon-neutral shipping",
                          "Patent-pending",
                          "24/7 support",
                        ]}
                      />
                    ) : (
                      <div className="space-y-2">
                        {(brandProfile.differentiators || []).map(
                          (diff, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 p-2 rounded-md bg-muted/50"
                            >
                              <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{diff}</span>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  {/* Social Proof - Editable */}
                  {(brandProfile.socialProofAssets || editing) && (
                    <div className="space-y-2">
                      <Label htmlFor="socialProofAssets">
                        Social Proof / Recognition (optional)
                      </Label>
                      {editing ? (
                        <Input
                          id="socialProofAssets"
                          value={
                            Array.isArray(editedProfile.socialProofAssets)
                              ? editedProfile.socialProofAssets.join(", ")
                              : editedProfile.socialProofAssets || ""
                          }
                          onChange={(e) =>
                            handleChange("socialProofAssets", e.target.value)
                          }
                          placeholder="e.g. 10,000+ 5-star reviews, featured on Forbes"
                        />
                      ) : (
                        <Input
                          value={
                            Array.isArray(brandProfile.socialProofAssets)
                              ? brandProfile.socialProofAssets.join(", ")
                              : brandProfile.socialProofAssets || ""
                          }
                          disabled
                        />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Marketing Context */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <CardTitle>Marketing Context</CardTitle>
                  </div>
                  <CardDescription>
                    Channels, campaigns, and pricing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Preferred Channels - Editable with Button Toggle */}
                  <div className="space-y-2">
                    <Label>
                      Preferred Marketing Channels
                      <InfoHoverCard info={infoContent["channels"]} />
                    </Label>
                    {editing ? (
                      <div className="flex flex-wrap gap-2">
                        {marketingChannels.map((ch) => (
                          <Button
                            type="button"
                            key={ch.value}
                            variant={
                              (
                                (editedProfile.preferredChannels as string[]) ||
                                []
                              ).includes(ch.value)
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              toggleArrayValue("preferredChannels", ch.value)
                            }
                            className="flex items-center gap-2"
                          >
                            <span>{ch.icon}</span>
                            {ch.label}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(brandProfile.preferredChannels || []).map(
                          (channel, idx) => (
                            <Badge key={idx} variant="secondary">
                              {channel}
                            </Badge>
                          )
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Average Order Value - Editable */}
                    <div className="space-y-2">
                      <Label htmlFor="averageOrderValue">
                        Average Order Value (optional)
                      </Label>
                      {editing ? (
                        <Input
                          id="averageOrderValue"
                          type="number"
                          value={String(editedProfile.averageOrderValue ?? "")}
                          onChange={(e) =>
                            handleChange("averageOrderValue", e.target.value)
                          }
                          placeholder={`e.g. ${getCurrencySymbol()}50`}
                          min="0"
                        />
                      ) : (
                        <Input
                          value={
                            brandProfile.averageOrderValue !== null &&
                            brandProfile.averageOrderValue !== undefined
                              ? `${brandProfile.currency || ""} ${
                                  brandProfile.averageOrderValue
                                }`
                              : "Not specified"
                          }
                          disabled
                        />
                      )}
                    </div>

                    {/* Primary CTA - Editable */}
                    {/* <div className="space-y-2">
                      <Label htmlFor="primaryCTA">Primary Call-to-Action</Label>
                      {editing ? (
                        <Input
                          id="primaryCTA"
                          value={(editedProfile.primaryCTA as string) ?? ""}
                          onChange={(e) =>
                            handleChange("primaryCTA", e.target.value)
                          }
                          placeholder="e.g. Shop Now"
                        />
                      ) : (
                        <Input
                          value={brandProfile.primaryCTA ?? "Shop Now"}
                          disabled
                        />
                      )}
                    </div> */}

                    {/* Shipping Policy - Editable */}
                    {(brandProfile.shippingPolicy || editing) && (
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="shippingPolicy">
                          Shipping Policy (optional)
                        </Label>
                        {editing ? (
                          <Textarea
                            id="shippingPolicy"
                            value={
                              (editedProfile.shippingPolicy as string) ?? ""
                            }
                            onChange={(e) =>
                              handleChange("shippingPolicy", e.target.value)
                            }
                            placeholder="e.g. Free shipping over $50"
                            rows={2}
                          />
                        ) : (
                          <Textarea
                            value={brandProfile.shippingPolicy ?? ""}
                            disabled
                            rows={2}
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Top Products - Editable with TagInput */}
                  <div className="space-y-2">
                    <Label>Top Products (optional)</Label>
                    {editing ? (
                      <TagInput
                        value={
                          (editedProfile.topSellingProducts as string[]) ||
                          brandProfile.topSellingProducts ||
                          []
                        }
                        onChange={(tags) =>
                          handleChange("topSellingProducts", tags)
                        }
                        placeholder="Add top-selling products"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {(brandProfile.topSellingProducts || []).length > 0 ? (
                          (brandProfile.topSellingProducts || []).map(
                            (product, idx) => (
                              <Badge key={idx} variant="outline">
                                {product}
                              </Badge>
                            )
                          )
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            No products added
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              {editing && (
                <div className="flex gap-4 justify-end">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </div>
              )}
            </>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Brand Profile Found</CardTitle>
                <CardDescription>
                  Complete your brand profile to unlock AI-powered content
                  generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  A brand profile helps us understand your business and generate
                  personalized, high-converting content tailored to your
                  audience.
                </p>
                <Button
                  onClick={() => router.push("/onboarding")}
                  className="gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Complete Onboarding
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Usage & Billing Tab */}
        <TabsContent value="usage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription>
                Track your AI content generation usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-muted-foreground">
                      This Month
                    </span>
                  </div>
                  <p className="text-3xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Generations used
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Remaining
                    </span>
                  </div>
                  <p className="text-3xl font-bold">10</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Free tier limit
                  </p>
                </div>

                <div className="p-4 rounded-lg border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Batch Jobs
                    </span>
                  </div>
                  <p className="text-3xl font-bold">0</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Processed this month
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold mb-3">Usage by Tool</h3>
                <div className="space-y-2">
                  {[
                    { name: "Headline Generator", count: 0, icon: Target },
                    { name: "Product Description", count: 0, icon: FileText },
                    { name: "Benefit Bullets", count: 0, icon: Zap },
                    { name: "Ad Copy Generator", count: 0, icon: Facebook },
                    { name: "Email Subject Lines", count: 0, icon: Mail },
                  ].map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <div
                        key={tool.name}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50"
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{tool.name}</span>
                        </div>
                        <span className="text-sm font-medium">
                          {tool.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upgrade Your Plan</CardTitle>
              <CardDescription>
                Get unlimited access to all AI tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-lg border-2 border-border">
                  <h3 className="font-semibold text-lg mb-2">Free Plan</h3>
                  <p className="text-3xl font-bold mb-4">
                    $0
                    <span className="text-sm font-normal text-muted-foreground">
                      /month
                    </span>
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>10 generations per month</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>Access to all tools</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>Basic support</span>
                    </li>
                  </ul>
                  <Badge variant="secondary">Current Plan</Badge>
                </div>

                <div className="p-6 rounded-lg border-2 border-primary bg-primary/5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">Pro Plan</h3>
                    <Badge variant="default">Popular</Badge>
                  </div>
                  <p className="text-3xl font-bold mb-4">
                    $29
                    <span className="text-sm font-normal text-muted-foreground">
                      /month
                    </span>
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>Unlimited generations</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>Batch processing</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm">
                      <span className="text-green-600">✓</span>
                      <span>API access</span>
                    </li>
                  </ul>
                  <Button className="w-full">Upgrade Now</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
