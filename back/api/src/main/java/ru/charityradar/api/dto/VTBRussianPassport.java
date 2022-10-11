package ru.charityradar.api.dto;

public record VTBRussianPassport(String series, String number, String issueDate, String departmentDoc,
                                 String lastName, String firstName, String middleName, String gender,
                                 String birthDate, String birthPlace, String issuedBy, String issueId) { }
