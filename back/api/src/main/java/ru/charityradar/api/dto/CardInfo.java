package ru.charityradar.api.dto;

import ru.charityradar.api.dto.VTB.VTBCardInfo;

public record CardInfo(String number, String expire, String holder) {
    public static CardInfo generate(final VTBCardInfo cardInfo) {
        if (cardInfo == null) return null;
        return new CardInfo(cardInfo.encryptedPan(), cardInfo.cardExpiry(), cardInfo.embossingName());
    }
}
