import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container py-24">
      <h1 className="text-4xl font-heading font-bold text-white mb-8">
        About Exoplanet
      </h1>
      <Card className="glass p-12 text-center">
        <CardContent>
          <p className="text-muted-foreground">
            Organization history and values coming soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
