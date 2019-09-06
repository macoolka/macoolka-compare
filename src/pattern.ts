import { Options } from 'micromatch';
import * as micromatch from 'micromatch';
import { isArray } from 'macoolka-predicate';
export {
    Options as PatternOption
}
export const pattern = (pattern: string | string[]) => (value: string): boolean => {
    pattern = isArray(pattern) ? pattern : [pattern]
    return pattern.every(a => micromatch.isMatch(value, a, { basename: true }))
}