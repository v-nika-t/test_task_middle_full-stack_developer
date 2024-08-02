import { IOrderItem, IStoreItem } from "./interfaces";

export class Store {
  private quantities: Record<number, number> = {}; // Ключи - размеры, значения - количество
  private currentOrders: IOrderItem[] = [];

  constructor(items: IStoreItem[]) {
    items.forEach((item) => {
      this.quantities[item.size] =
        (this.quantities[item.size] || 0) + item.quantity;
    });
  }

  public getQuantity(size: number): number {
    return this.quantities[size] || 0;
  }

  public decreaseQuantity(size: number): void {
    if (this.quantities[size] > 0) {
      this.quantities[size]--;
    }
  }

  public increaseQuantity(size: number): void {
    if (this.quantities[size] !== undefined) {
      this.quantities[size]++;
    }
  }

  public hasSize(size: number): boolean {
    return this.getQuantity(size) > 0;
  }

  public addOrder(item: IOrderItem): void {
    this.currentOrders.push(item);
  }

  public removeOrder(): void {
    this.currentOrders.pop();
  }

  public getOrders(): IOrderItem[] {
    return this.currentOrders;
  }

  public copy(): Store {
    const copy = new Store([]);
    copy.quantities = { ...this.quantities };
    copy.currentOrders = [...this.currentOrders];
    return copy;
  }
}
