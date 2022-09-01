import {GildedRose, Item} from '@/gilded-rose';

function checkItem(items: Array<Item>, expectedName: string, expectedSellIn: number, expectedQuality: number) {
  expect(items[0].name).toBe(expectedName);
  expect(items[0].sellIn).toBe(expectedSellIn);
  expect(items[0].quality).toBe(expectedQuality);
}

describe('Gilded Rose', () => {
  it('should degrade a normal item with positive days and quality correctly', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
    checkItem(items, 'foo', 0, 0);
  });
  it('should degrade a normal item past its SellIn days twice as fast', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 2)]);
    const items = gildedRose.updateQuality();
    checkItem(items, 'foo', -1, 0);
  })
});
