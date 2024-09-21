import { AmIConnectedGuard } from './am-i-connected.guard';

describe('AmIConnectedGuard', () => {
    it('should be defined', () => {
        expect(new AmIConnectedGuard()).toBeDefined();
    });
});
