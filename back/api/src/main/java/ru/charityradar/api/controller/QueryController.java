package ru.charityradar.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.charityradar.api.constant.TransactionType;
import ru.charityradar.api.helper.Helper;
import ru.charityradar.api.model.Transaction;
import ru.charityradar.api.service.TransactionService;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;

@RestController
@RequestMapping("/getTransHis")
public class QueryController {

    @Autowired
    private final TransactionService _transactionService;

    public QueryController(TransactionService transactionService) {
        _transactionService = transactionService;
    }

    @GetMapping
    @RequestMapping("/")
    public String getTransHis(Model model, @RequestParam("fundId") Integer fundId) throws ParseException {
        SimpleDateFormat monthYear = new SimpleDateFormat("yyyy-MM");
        Iterable<Transaction> allTransactions = _transactionService.getTransactionsByFundId(fundId);
        HashMap<String, Float[]> hmSumms = new HashMap<>();
        HashMap<String, ArrayList<Transaction>> hmTrans = new HashMap<>();
        for (Transaction trans : allTransactions) {
            if (trans.getDateTime() == null || trans.getDateTime().isEmpty()) continue;
            String date = trans.getDateTime().substring(0, 7);
            ArrayList<Transaction> tempTrans = new ArrayList<>();
            Float[] amounts = new Float[]{0f, 0f};
            if (hmSumms.containsKey(date)) {
                amounts = hmSumms.get(date);
                tempTrans = hmTrans.get(date);
            }
            tempTrans.add(trans);
            if (trans.getType() == TransactionType.EXPENSE)
                amounts = new Float[]{amounts[0] + trans.getAmount(), amounts[1]};
            else
                amounts = new Float[]{amounts[0], amounts[1] + trans.getAmount()};
            hmSumms.put(date, amounts);
            hmTrans.put(date, tempTrans);
        }

        StringBuilder sb = new StringBuilder();
        boolean first = true;
        sb.append("[");
        for (String date : hmSumms.keySet()){
            if (!first) sb.append(",");
            sb.append("\"").append(Helper.monthsRus[monthYear.parse(date).getMonth()]).append("\":{");
            sb.append("\"expense\":").append(hmSumms.get(date)[0]);
            sb.append(",\"fills\":").append(hmSumms.get(date)[1]);
            sb.append(",\"transactions\":[");
            boolean firstAdded = false;
            for (Transaction trans : hmTrans.get(date)) {
                if (firstAdded) sb.append(",");
                sb.append("{\"name\":").append("\"").append(trans.getName()).append("\"");
                sb.append(",\"category\":").append("\"").append(trans.getCategory()).append("\"");
                sb.append(",\"amount\":").append("\"").append(trans.getAmount()).append("\"");
                sb.append(",\"date\":").append("\"").append(trans.getDateTime()).append("\"");
                sb.append(",\"type\":\"").append(trans.getType()).append("\"}");
                firstAdded = true;
            }
            sb.append("]");
            sb.append("}");
            first = false;
        }
        sb.append("]");
        return sb.toString();
    }

}
