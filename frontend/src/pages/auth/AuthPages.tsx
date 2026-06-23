import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Seo } from "../../lib/seo";

export function AuthPage({ mode }: { mode: "login" | "register" | "forgot" | "reset" | "verify" }) {
  const title = {
    login: "Login",
    register: "Create Account",
    forgot: "Forgot Password",
    reset: "Reset Password",
    verify: "Verify Account"
  }[mode];

  return (
    <>
      <Seo title={title} />
      <section className="container grid min-h-[70vh] place-items-center py-10">
        <Card className="w-full max-w-md p-6">
          <h1 className="text-2xl font-black">{title}</h1>
          <form className="mt-6 grid gap-4">
            {mode === "register" ? <input className="h-11 rounded-md border border-border bg-background px-3" placeholder="Full name" /> : null}
            {mode !== "reset" ? <input className="h-11 rounded-md border border-border bg-background px-3" placeholder="Email address" /> : null}
            {["login", "register", "reset"].includes(mode) ? <input className="h-11 rounded-md border border-border bg-background px-3" type="password" placeholder="Password" /> : null}
            {["verify", "reset"].includes(mode) ? <input className="h-11 rounded-md border border-border bg-background px-3" placeholder="OTP code" /> : null}
            <Button>{title}</Button>
            {mode === "login" ? <Button type="button" variant="secondary">Continue with Google</Button> : null}
          </form>
        </Card>
      </section>
    </>
  );
}
