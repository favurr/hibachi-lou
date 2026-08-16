import prisma from "./lib/prisma";
import { auth } from "./lib/auth";

async function createAdmin() {
  const email = "emekafavi2019@gmail.com";
  const password = "Backup@01";
  const name = "Admin Lou";

  console.log(`Attempting to sign up ${email}...`);

  try {
    // 1. Create the user using Better Auth server API (handles password hashing)
    const user = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });

    if (!user) {
      throw new Error("Failed to create user through Better Auth API");
    }

    // 2. Elevate role to OWNER in database
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role: "OWNER" },
    });

    console.log("Success! Admin user created and promoted to OWNER:");
    console.log(updatedUser);
  } catch (error: any) {
    console.error("Error creating admin user:", error?.message || error);
  }
}

createAdmin();
