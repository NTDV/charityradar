package ru.charityradar.api.mixed;

import ru.charityradar.api.model.Fees;
import ru.charityradar.api.model.Fund;
import java.util.List;

public class FundMixed {
    private Integer id;
    private String name;
    private String email;
    private String phone;
    private String image;
    private String description;
    private Float rating;
    private String balanceId;
    private List<Fees> fees;

    public FundMixed(Fund fund, List<Fees> fees) {
        this.id = fund.getId();
        this.name = fund.getName();
        this.email = fund.getEmail();
        this.phone = fund.getPhone();
        this.image = fund.getImage();
        this.description = fund.getDescription();
        this.rating = fund.getRating();
        this.balanceId = fund.getBalanceId();
        this.fees = fees;
    }

}
