const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 30;

const buckets = new Map<string, number[]>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetMs: number;
};

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;

  const existing = buckets.get(ip) ?? [];
  const recent = existing.filter((t) => t > cutoff);

  if (recent.length >= MAX_REQUESTS) {
    const oldest = recent[0];
    return {
      allowed: false,
      remaining: 0,
      resetMs: oldest + WINDOW_MS - now,
    };
  }

  recent.push(now);
  buckets.set(ip, recent);

  return {
    allowed: true,
    remaining: MAX_REQUESTS - recent.length,
    resetMs: WINDOW_MS,
  };
}

export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) {
    const first = fwd.split(",")[0]?.trim();
    if (first) return first;
  }
  const real = headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}
