package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.model.Balance;
import ru.charityradar.api.repository.BalanceRepository;
import ru.charityradar.api.repository.FundRepository;

@Service
public class BalanceService {

    public class NotEnoughMoneyException extends IllegalArgumentException { }

    @Autowired
    private BalanceRepository _balanceRepository;
    @Autowired
    private FundRepository _fundRepository;

    public Balance createBalance(){
        Balance balance = new Balance();
        return _balanceRepository.save(balance);
    }

    public Balance addExpense(Balance balance, Float amount) {
        final Float currentBalance = balance.getBalance();
        if (currentBalance < amount) throw new NotEnoughMoneyException();
        balance.setBalance(currentBalance - amount);
       return  _balanceRepository.save(balance);
    }

    public Balance addRefill(Balance balance, Float amount) {
        balance.setBalance(balance.getBalance() + amount);
        return _balanceRepository.save(balance);
    }

    public Balance getBalanceById(String id) {
        return _balanceRepository.getBalanceById(id);
    }

    public Balance getBalanceByFundId(final String fundId) {
        return getBalanceById(_fundRepository.getFundById(Integer.valueOf(fundId)).getBalanceId());
    }

    public Float getBalanceAmountById(String id) {
        return _balanceRepository.getBalanceById(id).getBalance();
    }
}
