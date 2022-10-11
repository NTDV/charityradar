package ru.charityradar.api.dto;

public record VTBMe(String surname, Integer name, String patronymic, String gender, String birthPlace,
                    String birthDate, String maritalStatus, String mainMobilePhone, String mobilePhone, String email,
                    VTBSimpleAddres registrationAddress, VTBSimpleAddres temporaryAddress, VTBSimpleAddres actualAddress,
                    String snils, String inn, VTBRussianPassport rfPassport, String mdmId) { }
