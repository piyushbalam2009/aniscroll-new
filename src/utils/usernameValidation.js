const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,20}$/;

export function validateUsername(value) {
  const username = String(value || '').trim();
  if (!username) return { valid: false, message: 'Username is required.' };
  if (username.length < 3 || username.length > 20) return { valid: false, message: 'Username must be 3–20 characters long.' };
  if (!USERNAME_PATTERN.test(username)) return { valid: false, message: 'Use only letters, numbers, and underscores.' };
  return { valid: true, message: '' };
}

export function checkUsernameCooldown(lastChangedAt, cooldownDays = 14, now = Date.now()) {
  if (!lastChangedAt) return { allowed: true, remainingMs: 0, nextChangeAt: null };
  const changedAt = typeof lastChangedAt === 'number' ? lastChangedAt : new Date(lastChangedAt).getTime();
  if (!Number.isFinite(changedAt)) return { allowed: true, remainingMs: 0, nextChangeAt: null };
  const nextChangeAt = changedAt + cooldownDays * 24 * 60 * 60 * 1000;
  const remainingMs = Math.max(0, nextChangeAt - now);
  return { allowed: remainingMs === 0, remainingMs, nextChangeAt: new Date(nextChangeAt).toISOString() };
}
