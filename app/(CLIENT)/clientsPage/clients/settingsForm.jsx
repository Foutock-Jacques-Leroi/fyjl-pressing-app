"use client"

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsForm({ user }) {
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [saving, setSaving] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    // demo: show a success toast / alert
    setTimeout(() => {
      setSaving(false);
      alert("Profile updated (demo)");
    }, 800);
  }

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Avatar>
          {user?.image ? (
            <AvatarImage src={user.image} alt={user.name} />
          ) : (
            <AvatarFallback>{(user?.name || "U").charAt(0)}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <h2 className="text-lg font-medium">{user?.name || "Your profile"}</h2>
          <p className="text-sm text-muted-foreground">Manage your account information</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 gap-4">
        <div>
          <Label>Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <Label>Email</Label>
          <Input name="email" value={form.email} onChange={handleChange} type="email" />
        </div>
        <div>
          <Label>Phone</Label>
          <Input name="phone" value={form.phone} onChange={handleChange} />
        </div>

        <div className="flex gap-2 justify-end pt-2">
          <Button variant="outline">Cancel</Button>
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save changes"}</Button>
        </div>
      </form>
    </Card>
  );
}
