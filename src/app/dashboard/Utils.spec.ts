import { Utils } from "./Utils";

describe('Utils', () => {

  describe('isNotBlank', () => {

    it('should return true for non-empty string', () => {
      expect(Utils.isNotBlank('hello')).toBe(true);
    });

    it('should return false for null or empty string', () => {
      expect(Utils.isNotBlank(null)).toBe(false);
      expect(Utils.isNotBlank('')).toBe(false);
    });

  });

  describe('isEmpty', () => {

    it('should return true for empty array', () => {
      expect(Utils.isEmpty([])).toBe(true);
    });

    it('should return false for non-empty array', () => {
      expect(Utils.isEmpty([1, 2, 3])).toBe(false);
    });

  });
});