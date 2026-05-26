"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Lock, User, Settings2 } from "lucide-react";

export default function ClientSettingsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40">
          <div className="space-y-4">
            <p className="inline-flex rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">
              Account settings
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-950">Update your profile and security preferences.</h1>
            <p className="max-w-3xl text-sm leading-6 text-slate-600">Manage your contact details, password, and notification preferences from one elegant control center.</p>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/30">
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="bg-slate-100 p-1 rounded-3xl">
              <TabsTrigger value="profile" className="rounded-3xl px-4 py-3 text-sm font-semibold text-slate-700">Profile</TabsTrigger>
              <TabsTrigger value="security" className="rounded-3xl px-4 py-3 text-sm font-semibold text-slate-700">Security</TabsTrigger>
              <TabsTrigger value="preferences" className="rounded-3xl px-4 py-3 text-sm font-semibold text-slate-700">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-950">Personal information</h2>
                    <p className="mt-2 text-sm text-slate-600">Keep your name, email, and phone number up to date.</p>
                  </div>
                  <Badge variant="secondary" className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold">
                    <User className="h-4 w-4" /> Saved profile
                  </Badge>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full name</Label>
                    <Input id="fullName" defaultValue="Jean Dupont" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input id="email" type="email" defaultValue="jean.dupont@example.com" />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <Input id="phone" type="tel" defaultValue="+237 6 12 34 56 78" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="Douala, Cameroon" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">About you</Label>
                  <Textarea id="bio" defaultValue="I love staying organized and booking the best wellness appointments." rows={4} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <Button>Save profile</Button>
                  <span className="text-sm text-slate-500">Last updated 2 days ago</span>
                </div>
              </div>

              <Card className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <CardHeader>
                  <CardTitle>Profile snapshot</CardTitle>
                  <CardDescription>Quick details for your account and booking profile.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Membership tier</p>
                    <p className="mt-2 font-semibold text-slate-950">Gold client</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Upcoming scheduled visits</p>
                    <p className="mt-2 font-semibold text-slate-950">3 appointments</p>
                  </div>
                  <div className="rounded-3xl bg-slate-50 p-4">
                    <p className="text-sm text-slate-500">Preferred service</p>
                    <p className="mt-2 font-semibold text-slate-950">Relaxing Massage</p>
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button variant="outline">Manage notifications</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950">Security settings</h2>
                  <p className="mt-2 text-sm text-slate-600">Control your login details and access permissions.</p>
                </div>
                <Badge variant="secondary" className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold">
                  <Lock className="h-4 w-4" /> Strong security
                </Badge>
              </div>

              <div className="space-y-5 rounded-[1.75rem] border border-slate-200 bg-white p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-950">Change password</p>
                      <p className="text-sm text-slate-500">Update your password anytime to keep your account secure.</p>
                    </div>
                    <Badge variant="outline">Required</Badge>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current password</Label>
                      <Input id="currentPassword" type="password" defaultValue="••••••••" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New password</Label>
                      <Input id="newPassword" type="password" defaultValue="" placeholder="Enter a new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm password</Label>
                      <Input id="confirmPassword" type="password" defaultValue="" placeholder="Repeat new password" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Update password</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6 rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
                <div>
                  <h2 className="text-2xl font-semibold text-slate-950">Preferences</h2>
                  <p className="mt-2 text-sm text-slate-600">Pick your favorite interface and booking reminders.</p>
                </div>

                <div className="grid gap-5 rounded-[1.5rem] bg-white p-6 shadow-sm">
                  <div className="space-y-2">
                    <Label htmlFor="notificationEmail">Email notifications</Label>
                    <Input id="notificationEmail" defaultValue="Enabled" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Input id="theme" defaultValue="Light mode" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reminders">Booking reminders</Label>
                    <Input id="reminders" defaultValue="1 day before" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save preferences</Button>
                </div>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 text-slate-900">
                  <Settings2 className="h-5 w-5 text-cyan-600" />
                  <p className="font-semibold">Helpful tips</p>
                </div>
                <div className="mt-5 space-y-4 text-sm leading-6 text-slate-600">
                  <p>Keeping your email and phone current helps the team reach you faster when appointments change.</p>
                  <p>Use strong passwords and change them regularly to protect your booking history.</p>
                  <p>Enable reminders so you never miss a scheduled service.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
