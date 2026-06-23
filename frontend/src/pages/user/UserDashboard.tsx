import { Card } from "../../components/ui/Card";
import { Seo } from "../../lib/seo";

export function UserDashboard() {
  return (
    <>
      <Seo title="User Dashboard" />
      <section className="container py-8">
        <h1 className="text-3xl font-black">Dashboard</h1>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {["Profile", "Saved Articles", "Saved Products", "Comparison History", "Notifications", "Comments History", "Account Settings", "Password Change"].map((item) => (
            <Card key={item} className="p-5"><h2 className="font-bold">{item}</h2><p className="mt-2 text-sm text-muted-foreground">Account module ready for API integration.</p></Card>
          ))}
        </div>
      </section>
    </>
  );
}
