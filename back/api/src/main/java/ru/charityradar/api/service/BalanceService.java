package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.model.Balance;
import ru.charityradar.api.repository.BalanceRepository;

@Service
public class BalanceService {
    @Autowired
    private BalanceRepository _balanceRepository;

    public Balance createBalance(){
        Balance balance = new Balance();
        return _balanceRepository.save(balance);
    }

    public Balance addExpense(Balance balance, Float amount) {
        balance.setBalance(balance.getBalance() - amount);
       return  _balanceRepository.save(balance);
    }

    public Balance addRefill(Balance balance, Float amount) {
        balance.setBalance(balance.getBalance() + amount);
        return _balanceRepository.save(balance);
    }

    public Balance getBalanceById(String id) {
        return _balanceRepository.getBalanceById(id);
    }

    public Float getBalanceAmountById(String id) {
        return _balanceRepository.getBalanceById(id).getBalance();
    }

}
