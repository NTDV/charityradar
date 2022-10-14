package ru.charityradar.api.helper;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Helper {

    public static final String passRegex = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$";
    public static String getErrorJson(String errorText) {
        return "{\"error\":{\"" + errorText + "\"}";
    }
    public static SimpleDateFormat dateTimeFormatter = new SimpleDateFormat("dd.MM.yyyy HH:mm:ss");
    public static SimpleDateFormat dateFormatter = new SimpleDateFormat("dd.MM.yyyy");
    public static String[] monthsRus = new String[] {"Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"};

    public static Date[] getMonthStartEndNow() {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));
        Date monthFirstDay = calendar.getTime();
        calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
        Date monthLastDay = calendar.getTime();
        return new Date[]{monthFirstDay, monthLastDay};
    }

}
