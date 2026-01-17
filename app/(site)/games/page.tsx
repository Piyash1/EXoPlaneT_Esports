import { Card, CardContent } from "@/components/ui/card";

export default function GamesPage() {
  return (
    <div className="container py-24">
      <h1 className="text-4xl font-heading font-bold text-white mb-8">
        Supported Games
      </h1>
      <Card className="glass p-12 text-center">
        <CardContent>
          <p className="text-muted-foreground">Games list view coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
