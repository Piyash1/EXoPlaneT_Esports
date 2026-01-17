import { Card, CardContent } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <Card className="glass w-full max-w-md p-8">
        <CardContent>
          <h1 className="text-2xl font-bold text-white mb-4">Login</h1>
          <p className="text-muted-foreground">Auth flow coming soon.</p>
        </CardContent>
      </Card>
    </div>
  );
}
