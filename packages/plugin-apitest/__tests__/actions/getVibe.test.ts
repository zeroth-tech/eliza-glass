import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getVibe } from '../../src/actions/getVibe';
import { ApiTestService } from '../../src/services/ApiTestService';

vi.mock('../../src/services/ApiTestService', () => ({
    ApiTestService: {
        getInstance: vi.fn(() => ({
            getVibe: vi.fn().mockResolvedValue("clyde and ank back at it again")
        }))
    }
}));

describe('getVibe Action', () => {
    const mockRuntime = {
        getSetting: vi.fn(),
        getState: vi.fn(),
        setState: vi.fn(),
    };

    const mockMessage = {
        content: {
            text: 'Get Vibe',
            type: 'GET_VIBE'
        }
    };

    const mockState = {};
    const mockCallback = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('validate', () => {
        it('should validate successfully', async () => {
            const result = await getVibe.validate(mockRuntime, mockMessage);
            expect(result).toBe(true);
        });
    });

    describe('handler', () => {
        it('should get vibe and call callback', async () => {
            const result = await getVibe.handler(
                mockRuntime,
                mockMessage,
                mockState,
                {},
                mockCallback
            );

            expect(ApiTestService.getInstance).toHaveBeenCalled();
            expect(mockCallback).toHaveBeenCalledWith({
                text: 'clyde and ank back at it again'
            });
            expect(result).toBe(true);
        });
    });
}); 