import { observable, action, makeObservable } from 'mobx';

// глобальный стор для карты
class BankCardStore {
  amount: null | number = null;
  monthDonations: null | number = null;

  constructor() {
    makeObservable(this, {
      amount: observable,
      monthDonations: observable,

      setCurrentBalance: action,
      setDonations: action,
      clearCard: action,
    });
  }

  setCurrentBalance(balance: number) {
    this.amount = balance;
  }

  setDonations(donations: number) {
    this.monthDonations = donations;
  }

  clearCard() {
    this.amount = null;
    this.monthDonations = null;
  }
}

export const bankCardStore = new BankCardStore();
