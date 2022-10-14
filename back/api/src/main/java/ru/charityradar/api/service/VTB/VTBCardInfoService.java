package ru.charityradar.api.service.VTB;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.charityradar.api.constant.TransactionStatus;
import ru.charityradar.api.constant.TransactionType;
import ru.charityradar.api.dto.CardInfo;
import ru.charityradar.api.dto.IntegerAndBalance;
import ru.charityradar.api.dto.VTB.VTBCardInfo;
import ru.charityradar.api.dto.VTB.VTBCvv;
import ru.charityradar.api.input.CardInput;
import ru.charityradar.api.input.TransactionInput;
import ru.charityradar.api.model.Balance;
import ru.charityradar.api.service.*;

import javax.security.sasl.AuthenticationException;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.Objects;

@AllArgsConstructor
@Service
public class VTBCardInfoService {
    @Autowired
    private final AuthService _authService;
    @Autowired
    private final UserService _userService;
    @Autowired
    private final FundService _fundService;
    @Autowired
    private final FeesService _feesService;
    @Autowired
    private final BalanceService _balanceService;

    @Autowired
    private final TransactionService _transactionService;

    public VTBCardInfo getMainCardInfo(final String token) throws AuthenticationException {
        final var auth = _authService.getAuthByToken(token);
        if (auth == null || auth.getVtbMdmId() == null) throw new AuthenticationException("No VTB ID according to this account.");
        return VTBCardInfo.generate(auth, 0);
    }

    public Balance addToUserBalance(final String token, final CardInput cardInput, final Float amount) throws AuthenticationException, ParseException {
        final var auth = _authService.getAuthByToken(token);
        final var user = _userService.getUserById(auth.getLink());
        final var vtbCardInfo = CardInfo.generate(getMainCardInfo(token));
        final var cvv = VTBCvv.generate(auth, "0").Cvv();
        final Balance balance;
        if (cardInput.equalsTo(vtbCardInfo) && Objects.equals(cardInput.getCvc(), cvv) && amount > 0.0 &&
                amount < 600_000 && (balance = _balanceService.addRefill(_balanceService.getBalanceById(user.getBalanceId()), amount)) != null) {
            _transactionService.addTransaction(new TransactionInput(
                    TransactionType.REFILL,
                    amount,
                    LocalDate.now().toString(),
                    null,
                    null,
                    TransactionStatus.CONFIRMED,
                    null,
                    null,
                    auth.getLink(),
                    null));
            return balance;
        } else throw new IllegalArgumentException("Some values has unexpected value.");
    }

    public Balance payToFund(final String token, final CardInput cardInput, final Float amount, final String fundId)
            throws AuthenticationException, ParseException {
        final var auth = _authService.getAuthByToken(token);
        final var fund = _fundService.getFundById(Integer.valueOf(fundId));
        final var vtbCardInfo = CardInfo.generate(getMainCardInfo(token));
        final var cvv = VTBCvv.generate(auth, "0").Cvv();
        final Balance balance;
        if (cardInput.equalsTo(vtbCardInfo) && Objects.equals(cardInput.getCvc(), cvv) && fund != null && amount > 0.0 &&
                amount < 600_000 && (balance = _balanceService.addRefill(_balanceService.getBalanceById(fund.getBalanceId()), amount)) != null) {
            _transactionService.addTransaction(new TransactionInput(
                    TransactionType.REFILL,
                    amount,
                    LocalDate.now().toString(),
                    null,
                    null,
                    TransactionStatus.CONFIRMED,
                    null,
                    Integer.valueOf(fundId),
                    auth.getLink(),
                    null));
            return balance;
        } else throw new IllegalArgumentException("Some values has unexpected value.");
    }

    public Integer payToFees(final String token, final CardInput cardInput, final Integer amount, final String feesId)
            throws AuthenticationException, ParseException {
        final var auth = _authService.getAuthByToken(token);
        final var fees = _feesService.getFeesById(Integer.valueOf(feesId));
        final var vtbCardInfo = CardInfo.generate(getMainCardInfo(token));
        final var cvv = VTBCvv.generate(auth, "0").Cvv();
        if (cardInput.equalsTo(vtbCardInfo) && Objects.equals(cardInput.getCvc(), cvv) && fees != null && amount > 0.0
                && amount < 600_000) {
            _transactionService.addTransaction(new TransactionInput(
                    TransactionType.REFILL,
                    amount.floatValue(),
                    LocalDate.now().toString(),
                    null,
                    null,
                    TransactionStatus.CONFIRMED,
                    Integer.valueOf(feesId),
                    null,
                    auth.getLink(),
                    null));
            _transactionService.addTransaction(new TransactionInput(
                    TransactionType.EXPENSE,
                    amount.floatValue(),
                    LocalDate.now().toString(),
                    null,
                    null,
                    TransactionStatus.CONFIRMED,
                    Integer.valueOf(feesId),
                    null,
                    auth.getLink(),
                    null));
            return _feesService.collect(fees, amount).getCollected();
        } else throw new IllegalArgumentException("Some values has unexpected value.");
    }

    public Balance[] payToFundByBalance(final String token, final Float amount, final String fundId)
            throws ParseException {
        final var auth = _authService.getAuthByToken(token);
        final var fund = _fundService.getFundById(Integer.valueOf(fundId));
        final Balance userBalance;
        final Balance balanceFund;
        if (amount > 0.0 && amount < 600_000 &&
                (userBalance = _balanceService.addExpense(_balanceService.getBalanceById(_userService.getUserById(auth.getLink()).getBalanceId()), amount)) != null &&
                (balanceFund = _balanceService.addRefill(_balanceService.getBalanceById(fund.getBalanceId()), amount)) != null) {
            _transactionService.addTransaction(new TransactionInput(
                    TransactionType.REFILL,
                    amount,
                    LocalDate.now().toString(),
                    null, null,
                    TransactionStatus.CONFIRMED,
                    null,
                    Integer.valueOf(fundId),
                    auth.getLink(),
                    null));
            return new Balance[] { userBalance, balanceFund };
        } else throw new IllegalArgumentException("Some values has unexpected value.");
    }

    public IntegerAndBalance payToFeesByBalance(final String token, final Integer amount, final String feesId)
            throws ParseException {
        final var auth = _authService.getAuthByToken(token);
        final var userBalance = _balanceService.getBalanceById(_userService.getUserById(auth.getLink()).getBalanceId());
        final var fees = _feesService.getFeesById(Integer.valueOf(feesId));
        if (fees != null && amount > 0 && amount < 600_000) {
            _balanceService.addRefill(userBalance, amount.floatValue());
            _transactionService.addTransaction(new TransactionInput(
                    TransactionType.REFILL,
                    amount.floatValue(),
                    LocalDate.now().toString(),
                    null, null,
                    TransactionStatus.CONFIRMED,
                    Integer.valueOf(feesId),
                    null,
                    auth.getLink(),
                    null));
            _transactionService.addTransaction(new TransactionInput(
                    TransactionType.EXPENSE,
                    amount.floatValue(),
                    LocalDate.now().toString(),
                    null, null,
                    TransactionStatus.CONFIRMED,
                    Integer.valueOf(feesId),
                    null,
                    auth.getLink(),
                    null));
            return new IntegerAndBalance(_feesService.collect(fees, amount).getCollected(), userBalance);
        } else throw new IllegalArgumentException("Some values has unexpected value.");
    }
}
