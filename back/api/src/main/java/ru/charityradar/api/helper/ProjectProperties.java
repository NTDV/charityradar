package ru.charityradar.api.helper;

import javax.mail.MessagingException;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

public class ProjectProperties {
    public static Properties properties = new Properties();

    public static Properties getProperties(){
        try (InputStream input = ProjectProperties.class.getClassLoader().getResourceAsStream("main.properties")) {
            properties = new Properties();
            properties.load(input);
        } catch (Exception e) {
            try {
                MailSender.sendLetterToSomebodyFromRobot("Ошибка чтения properties", e.getMessage(), "mail@sganiev.ru");
            } catch (MessagingException ex) {
                throw new RuntimeException(ex);
            }
        }
        return properties;
    }
}