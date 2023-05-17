export const calculateTotalCoins = (itemsInCart, itemsValue) => {
  let totalCoin = 0;
  itemsInCart.map((item) => {
    let itemId = item?.id;
    let value = itemsValue?.[itemId];
    let earnedCoin = value * item?.price;
    totalCoin = totalCoin + earnedCoin;
  });
  return totalCoin;
};
