package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.helper.Helper;
import ru.charityradar.api.input.TransactionInput;
import ru.charityradar.api.model.Transaction;
import ru.charityradar.api.repository.TransactionRepository;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.StreamSupport;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository _transactionRepository;

    public Transaction addTransaction(TransactionInput transactionInput) throws ParseException {
        final var transaction = new Transaction(transactionInput);
        return _transactionRepository.save(transaction);
    }

    public Iterable<Transaction> getTransactionsByUserId(Integer userId) {
        return _transactionRepository.getTransactionsByUserId(userId);
    }
    public Iterable<Transaction> getTransactionsByFundId(Integer fundId) {
        return _transactionRepository.getTransactionsByFundId(fundId);
    }

    public Float getMonthTransactionsByUserId(Integer userId, Date start, Date end) {
        Iterable<Transaction> allTransactions = _transactionRepository.getTransactionsByUserId(userId);
        try {
            List<Transaction> transactions = StreamSupport.stream(allTransactions.spliterator(), false)
                    .filter(trans -> {
                        try {
                            return inPeriod(start, end, trans);
                        } catch (ParseException e) {
                            throw new RuntimeException(e);
                        }
                    }).filter(trans -> trans.getFeesId() != null || trans.getFundId() != null).toList();
            float amount = 0;
            for (Transaction tx : transactions) {
                amount += tx.getAmount();
            }
            return amount;
        } catch (Exception e) {
            return 0f;
        }
    }

    public boolean inPeriod(Date start, Date end, Transaction transaction) throws ParseException {
        Date checkDate = Helper.dateTimeFormatter.parse(transaction.getDateTime());
        return !checkDate.before(start) && !checkDate.after(end);
    }

}
