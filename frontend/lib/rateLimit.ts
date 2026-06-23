const requests = new Map<string, number[]>();

export function rateLimit(ip: string, maxPerMinute = 30): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const times = (requests.get(ip) || []).filter((t) => now - t < windowMs);
  if (times.length >= maxPerMinute) return false;
  times.push(now);
  requests.set(ip, times);
  return true;
}
