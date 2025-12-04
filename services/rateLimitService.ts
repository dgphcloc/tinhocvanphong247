const STORAGE_KEY = "chat_rate_limit";
const LIMIT_COUNT = 10; // 5 messages
const TIME_WINDOW = 30 * 60 * 1000; // 30 minutes in milliseconds

interface RateLimitData {
  count: number;
  resetTime: number;
}

export const checkRateLimit = (): {
  allowed: boolean;
  remaining: number;
  resetInMinutes: number;
} => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const now = Date.now();

  if (!stored) {
    return { allowed: true, remaining: LIMIT_COUNT, resetInMinutes: 0 };
  }

  const data: RateLimitData = JSON.parse(stored);

  // If time window has passed, reset
  if (now > data.resetTime) {
    return { allowed: true, remaining: LIMIT_COUNT, resetInMinutes: 0 };
  }

  // Check count
  if (data.count >= LIMIT_COUNT) {
    const timeLeft = Math.ceil((data.resetTime - now) / 60000);
    return { allowed: false, remaining: 0, resetInMinutes: timeLeft };
  }

  return {
    allowed: true,
    remaining: LIMIT_COUNT - data.count,
    resetInMinutes: 0,
  };
};

export const recordRequest = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  const now = Date.now();

  let data: RateLimitData;

  if (stored) {
    data = JSON.parse(stored);
    // If expired, reset
    if (now > data.resetTime) {
      data = { count: 1, resetTime: now + TIME_WINDOW };
    } else {
      data.count += 1;
    }
  } else {
    data = { count: 1, resetTime: now + TIME_WINDOW };
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return LIMIT_COUNT - data.count;
};

export const getRemainingQuota = (): number => {
  const { remaining } = checkRateLimit();
  return remaining;
};
