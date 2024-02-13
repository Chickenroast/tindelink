import { signIn, signOut } from "auth";
import { Button } from "./ui/button";

// components/signup.tsx (or any other appropriate file)
import prisma from "../lib/prisma";

async function createUser(email: string, name?: string) {
  return await prisma.user.create({
    data: {
      email,
      name,
    },
  });
}

// Usage
createUser("user@example.com", "John Doe");

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn(provider);
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
      className="w-full"
    >
      <Button variant="ghost" className="w-full p-0" {...props}>
        Sign Out
      </Button>
    </form>
  );
}
