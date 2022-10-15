package ru.charityradar.api.constant;

public enum ModelWithImageType {
    FUND,           // 0
    NEWS,           // 1
    FEES,           // 2
    TRANSACTION;    // 3

    public static final ModelWithImageType[] values = ModelWithImageType.values();
    
    public static ModelWithImageType parse(final Integer i) {
        if (i >= 0 && i < values.length) return values[i];
        throw new EnumConstantNotPresentException(ModelWithImageType.class, String.valueOf(i));
    }
}
