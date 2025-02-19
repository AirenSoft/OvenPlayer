/**
 * Performs a deep merge of the `source` object's properties into the `target` object.
 * For nested objects, the function recurses; otherwise it directly overwrites values.
 *
 * @param {Object} target - The object to which properties are merged.
 * @param {Object} source - The object containing properties to be copied.
 * @returns {Object} The modified `target` object reference.
 *
 * @example
 * const objA = {
 *   a: 1,
 *   b: { x: 10, y: 20 }
 * };
 * const objB = {
 *   b: { y: 999, z: 50 },
 *   c: 3
 * };
 *
 * deepMerge(objA, objB);
 *  Result: objA = {
 *    a: 1,
 *    b: { x: 10, y: 999, z: 50 },
 *    c: 3
 *  }
 */
export default function deepMerge(target, source) {
  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (
        typeof source[key] === "object" &&
        source[key] !== null &&
        typeof target[key] === "object" &&
        target[key] !== null
      ) {
        deepMerge(target[key], source[key]);
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
