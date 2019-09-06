import {
    arrayCompare
} from '../Array';
it('array', () => {
    expect(arrayCompare().contains('1')(['1', '2'])).toEqual(true);
    expect(arrayCompare().contains('1')(['3', '2'])).toEqual(false);
    expect(arrayCompare().contains_every(['1', '2'])(['1', '2'])).toEqual(true);
    expect(arrayCompare().contains_every(['1', '2'])(['1', '3'])).toEqual(false);
    expect(arrayCompare().contains_some(['1', '2'])(['1', '1'])).toEqual(true);
    expect(arrayCompare().contains_some(['1', '2'])(['3', '4'])).toEqual(false);
});