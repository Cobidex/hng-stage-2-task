import { describe, it, expect } from 'vitest';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { getAuthToken } from '../lib/utils.js';

config({ path: "./.env"})

describe('Token Generation', () => {
  const payload = { userId: '12345' };
  const secret = process.env.JWT_SECRET;

  it('should generate a token with the correct payload and expiration time', () => {
    const token = getAuthToken(payload);
    const decoded = jwt.verify(token, secret);

    expect(decoded.userId).toBe(payload.userId);

    const now = Math.floor(Date.now() / 1000);
    expect(decoded.exp).toBeGreaterThan(now);
    expect(decoded.exp).toBeLessThanOrEqual(now + 3600);
  });
});
