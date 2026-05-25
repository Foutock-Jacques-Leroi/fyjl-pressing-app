import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export function ClientCard({ name, description, price }) {
  return (
    <Card
      className="w-[360px] overflow-hidden rounded-3xl border-0"
      style={{
        background: "linear-gradient(160deg, #ffffff 0%, #f0fdf9 60%, #e0f2fe 100%)",
        boxShadow: "0 8px 40px rgba(20,184,166,0.10), 0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <CardHeader
        className="px-6 pt-6 pb-4"
        style={{ background: "linear-gradient(135deg, #ccfbf1 0%, #e0f2fe 100%)" }}
      >
        <p
          className="text-xs uppercase tracking-[0.25em] mb-1"
          style={{ color: "#0d9488", fontFamily: "'Cormorant Garamond', serif" }}
        >
          Featured
        </p>
        <CardTitle
          className="text-2xl font-bold"
          style={{ color: "#134e4a", fontFamily: "'Cormorant Garamond', serif" }}
        >
          {name}
        </CardTitle>
        <span
          className="mt-3 inline-block w-fit rounded-full px-4 py-1 text-sm font-semibold"
          style={{
            background: "linear-gradient(90deg, #2dd4bf, #38bdf8)",
            color: "#fff",
            fontFamily: "'Nunito', sans-serif",
            boxShadow: "0 2px 12px rgba(45,212,191,0.30)",
          }}
        >
          ${price.toFixed(2)}
        </span>
      </CardHeader>

        <CardFooter
              className="flex gap-3 px-6 py-5 border-t"
              style={{ borderColor: "#e0e7ff" }}
            >
              <Button
                // onClick={onEdit}
                className="flex-1 h-12 rounded-xl font-bold text-white border-0 gap-2 text-sm"
                style={{
                  background: "linear-gradient(135deg, #818cf8 0%, #6366f1 100%)",
                  fontFamily: "'Nunito', sans-serif",
                  boxShadow: "0 4px 16px rgba(99,102,241,0.30)",
                }}
              >Acheter Ce Service</Button>
              </CardFooter>

      {/* Description */}
      <CardContent className="px-6 py-5">
        <p
          className="text-sm leading-relaxed"
          style={{ color: "#64748b", fontFamily: "'Nunito', sans-serif" }}
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );
}