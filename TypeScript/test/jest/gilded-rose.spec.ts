import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should degrade a normal item with positive days and quality correctly', () => {
    const gildedRose = new GildedRose([new Item('foo', 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
    expect(items[0].sellIn).toBe(0);
    expect(items[0].quality).toBe(0);
  });
  it('should degrade a normal item past its SellIn days twice as fast', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  })
});
