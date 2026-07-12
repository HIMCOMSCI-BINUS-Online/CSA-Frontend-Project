import { z } from "zod";

const createEnv = () => {
  const EnvSchema = z.object({ API_URL: z.string() });
  const envVars = Object.entries(import.meta.env).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (key.startsWith("VITE_APP_")) acc[key.replace("VITE_APP_", "")] = value;
      return acc;
    },
    {}
  );
  const parsedEnv = EnvSchema.safeParse(envVars);
  if (!parsedEnv.success) throw new Error("Missing VITE_APP_API_URL");
  return parsedEnv.data;
};

export const env = createEnv();
