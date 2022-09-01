import {GildedRose, Item} from '@/gilded-rose';

function checkItem(item: Item, expectedName: string, expectedSellIn: number, expectedQuality: number) {
  expect(item.name).toBe(expectedName);
  expect(item.sellIn).toBe(expectedSellIn);
  expect(item.quality).toBe(expectedQuality);
}

describe('Gilded Rose', () => {
  it('should degrade a normal item with positive days and quality correctly', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
    checkItem(items[0], 'foo', 0, 0);
  });
  it('should degrade a normal item past its SellIn days twice as fast', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 2)]);
    const items = gildedRose.updateQuality();
    checkItem(items[0], 'foo', -1, 0);
  })
});
