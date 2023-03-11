export class Utils {

  static isNotBlank(value: any) {
    return value != null && value != ""
  }

  static isEmpty(array: any[]) {
    return Array.isArray(array) && !array.length
  }
}
