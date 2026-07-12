import { LOGIN_HERO_IMAGE } from "@/assets/auth-layout-assets";

type AuthHeroPaneProps = { variant: "login" | "register" };

export function AuthHeroPane({ variant }: AuthHeroPaneProps) {
  return (
    <section className="relative hidden w-1/2 items-center justify-center overflow-hidden bg-inverse-surface p-20 lg:flex">
      <div className="absolute inset-0 z-0">
        <div className="absolute left-[-10%] top-[-10%] h-[70%] w-[70%] rounded-full bg-secondary opacity-30 blur-[120px]" />
        <div className="absolute bottom-[-5%] right-[-5%] h-[60%] w-[60%] rounded-full bg-tertiary opacity-25 blur-[100px]" />
        <div className="absolute inset-0 overflow-hidden opacity-40 mix-blend-screen">
          <img alt="" className="h-full w-full object-cover" src={LOGIN_HERO_IMAGE} />
        </div>
      </div>
      <div className="relative z-10 max-w-lg space-y-6">
        <h2 className="font-headline text-3xl font-bold tracking-tighter text-white">
          CSA | Computer Science Academy
        </h2>
        <p className="font-headline text-4xl italic leading-snug text-white">
          {variant === "login"
            ? '"The art of code is the intersection of logic and refined design."'
            : '"Build habits in code — one task at a time."'}
        </p>
        <div className="flex items-center gap-3">
          <div className="h-px w-8 bg-secondary" />
          <span className="font-label text-xs uppercase tracking-[0.2em] text-tertiary-foreground/60">
            CSA Tech Style
          </span>
        </div>
      </div>
    </section>
  );
}
