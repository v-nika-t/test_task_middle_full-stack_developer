import { Statistic } from "./statistic";
import { IOrderItem, IResult, IStoreItem } from "./interfaces";
import { Store } from "./store";
import { tests } from "./tests";

const process = (
  order: IOrderItem[],
  storeItems: IStoreItem[]
): IResult | false => {
  let foundSolution = false;
  let statistic = new Statistic();
  const initialStore = new Store(storeItems);

  const tryCombinations = (
    index: number,
    store: Store,
    currentStatistic: Statistic
  ) => {
    if (foundSolution) return;

    if (index === order.length) {
      store.getOrders().forEach((item) => {
        currentStatistic.addAssignment({ id: item.id, size: item.size[0] });
      });
      statistic = currentStatistic;
      foundSolution = true;
      return;
    }

    const currentOrderItem = order[index];
    const sizesToTry = currentOrderItem.size;

    for (const size of sizesToTry) {
      if (store.hasSize(size)) {
        store.decreaseQuantity(size);
        store.addOrder({ ...currentOrderItem, size: [size] });

        // Определение mismatch
        const preferredSizeIndex = currentOrderItem.masterSize
          ? currentOrderItem.masterSize === "s1"
            ? 0
            : 1
          : -1;
        const wasMismatch =
          preferredSizeIndex !== -1 &&
          size !== currentOrderItem.size[preferredSizeIndex];
        const statisticCopy = currentStatistic.copy();
        if (wasMismatch) {
          statisticCopy.increaseMismatches();
        }

        tryCombinations(index + 1, store.copy(), statisticCopy);

        if (foundSolution) return;

        store.removeOrder();
        store.increaseQuantity(size);
      }
    }
  };

  tryCombinations(0, initialStore.copy(), statistic.copy());
  return foundSolution ? statistic.getResult() : false;
};

//Checking
tests.forEach(({ store, order, isPossible, mismatches }, index) => {
  const result = process(order, store);
  result &&
    console.log(
      `${index}. Do the mismatches match? `,
      mismatches === result.mismatches
    );
  console.log(
    `${index}. Does the isPossible value match?`,
    isPossible === Boolean(result)
  );
});
