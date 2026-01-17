import { Card, CardContent } from "@/components/ui/card";

export default function StatsPage() {
  return (
    <div className="container py-24">
      <h1 className="text-4xl font-heading font-bold text-white mb-8">
        Statistics Dashboard
      </h1>
      <Card className="glass p-12 text-center">
        <CardContent>
          <p className="text-muted-foreground">
            Live stats integration coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
