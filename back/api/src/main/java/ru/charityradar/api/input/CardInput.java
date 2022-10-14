package ru.charityradar.api.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.charityradar.api.dto.CardInfo;

import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardInput {
    private String number;
    private String expire;
    private String holder;
    private String cvc;

    public boolean equalsTo(final CardInfo cardInfo) {
        return cardInfo != null &&
                cardInfo.number() != null &&
                cardInfo.expire() != null &&
                cardInfo.holder() != null &&
                number != null &&
                expire != null &&
                holder != null &&
                Objects.equals(number, cardInfo.number()) &&
                Objects.equals(expire, cardInfo.expire()) &&
                Objects.equals(holder, cardInfo.holder());
    }
}
