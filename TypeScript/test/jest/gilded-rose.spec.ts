import { GildedRose, Item } from "@/gilded-rose";

function checkItem(
  item: Item,
  expectedName: string,
  expectedSellIn: number,
  expectedQuality: number
) {
  expect(item.name).toBe(expectedName);
  expect(item.sellIn).toBe(expectedSellIn);
  expect(item.quality).toBe(expectedQuality);
}

describe("Gilded Rose", () => {
  it("should degrade a normal item with positive days and quality correctly", () => {
    const gildedRose = new GildedRose([new Item("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    checkItem(items[0], "foo", 0, 0);
  });
  it("should degrade a normal item past its SellIn days twice as fast", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 2)]);
    const items = gildedRose.updateQuality();
    checkItem(items[0], "foo", -1, 0);
  });
  it.each([
    ["past sell by date", 0],
    ["before sell by date", 1],
  ])(
    "should not degrade a normal item to negative quality, with sellIn value that is %s",
    (_string: string, sellIn: number) => {
      const gildedRose = new GildedRose([new Item("foo", sellIn, 0)]);
      const items = gildedRose.updateQuality();
      checkItem(items[0], "foo", sellIn - 1, 0);
    }
  );
  it("Aged Brie should increase in quality", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 1, 0)]);
    const items = gildedRose.updateQuality();
    checkItem(items[0], "Aged Brie", 0, 1);
  });
  it("Aged Brie *should* increase in quality at double the rate past its sellIn date???", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 0)]);
    const items = gildedRose.updateQuality();
    checkItem(items[0], 'Aged Brie', -1, 2);
  })
});
