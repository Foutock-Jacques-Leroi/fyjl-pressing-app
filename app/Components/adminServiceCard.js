import { Pencil, Trash2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function AdminCard({ name, description, price, onEdit, onDelete }) {
  return (
    <Card
      className="w-[360px] overflow-hidden rounded-3xl border-0"
      style={{
        background: "linear-gradient(160deg, #ffffff 0%, #f0f4ff 60%, #e8f0fe 100%)",
        boxShadow: "0 8px 40px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <CardHeader
        className="px-6 pt-6 pb-4"
        style={{ background: "linear-gradient(135deg, #e0e7ff 0%, #f5f3ff 100%)" }}
      >
        <p
          className="text-xs uppercase tracking-[0.25em] mb-1"
          style={{ color: "#6366f1", fontFamily: "'Cormorant Garamond', serif" }}
        >
          Admin Panel
        </p>
        <CardTitle
          className="text-2xl font-bold"
          style={{ color: "#1e1b4b", fontFamily: "'Cormorant Garamond', serif" }}
        >
          {name}
        </CardTitle>
        <span
          className="mt-3 inline-block w-fit rounded-full px-4 py-1 text-sm font-semibold"
          style={{
            background: "linear-gradient(90deg, #818cf8, #a5b4fc)",
            color: "#fff",
            fontFamily: "'Nunito', sans-serif",
            boxShadow: "0 2px 12px rgba(129,140,248,0.35)",
          }}
        >
          ${price.toFixed(2)}
        </span>
      </CardHeader>

      {/* Description */}
      <CardContent className="px-6 py-5">
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#64748b", fontFamily: "'Nunito', sans-serif" }}
        >
          {description}
        </p>
      </CardContent>

      {/* Buttons */}
      <CardFooter
        className="flex gap-3 px-6 py-5 border-t"
        style={{ borderColor: "#e0e7ff" }}
      >
        <Button
          onClick={onEdit}
          className="flex-1 h-12 rounded-xl font-bold text-white border-0 gap-2 text-sm"
          style={{
            background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
            fontFamily: "'Nunito', sans-serif",
            boxShadow: "0 4px 16px rgba(99,102,241,0.30)",
          }}
        >
          <Pencil className="w-4 h-4" /> Edit
        </Button>
        <Button
          onClick={onDelete}
          className="flex-1 h-12 rounded-xl font-bold border-0 gap-2 text-sm"
          style={{
            background: "linear-gradient(135deg, #fca5a5 0%, #f87171 100%)",
            color: "#7f1d1d",
            fontFamily: "'Nunito', sans-serif",
            boxShadow: "0 4px 16px rgba(248,113,113,0.25)",
          }}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
}