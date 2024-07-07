import { describe, it, expect, vi } from 'vitest';
import { getOrganisation } from '../controllers/organisationController.js';
import Organisation from '../models/organisationModel.js';

// Mock the Organisation model
vi.mock('../models/organisationModel.js', () => ({
  Organisation: {
    findOne: vi.fn(),
  },
  User: {},
}));

describe('getOrganisation', () => {
  it('should return organisation data if user has access', async () => {
    // Mock request and response objects
    const req = {
      params: { orgId: 1 },
      user: {
        toJSON: () => ({ userId: 1 }),
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    // Mock organisation data
    const orgData = { orgId: 1, name: 'Test Organisation', toJSON: () => orgData };

    Organisation.findOne.mockResolvedValue(orgData);

    // Call the function
    await getOrganisation(req, res);

    // Check if the response was correct
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      status: 'success',
      message: 'Organisation data',
      data: orgData,
    });
  });

  it('should return 404 if user does not have access', async () => {
    // Mock request and response objects
    const req = {
      params: { orgId: 1 },
      user: {
        toJSON: () => ({ userId: 2 }),
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    Organisation.findOne.mockResolvedValue(null);

    // Call the function
    await getOrganisation(req, res);

    // Check if the response was correct
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: 'Not Found',
      message: 'Organisation id not exist or you don\'t have access to it',
    });
  });

  it('should return 500 on server error', async () => {
    // Mock request and response objects
    const req = {
      params: { orgId: 1 },
      user: {
        toJSON: () => ({ userId: 1 }),
      },
    };

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    Organisation.findOne.mockRejectedValue(new Error('DB Error'));

    // Call the function
    await getOrganisation(req, res);

    // Check if the response was correct
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'internal server error' });
  });
});
