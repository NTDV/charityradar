package ru.charityradar.api.helper;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.util.Properties;

public class MailSender {

    public static void sendLetterToSomebodyFromRobot (String subject, String body, String receiver) throws MessagingException {
        Properties properties = ProjectProperties.getProperties();
        String login = properties.getProperty("mail.sender.login");
        String password = properties.getProperty("mail.sender.password");

        String from = "no-reply@iotachi.ru";
        Properties mailProperties = new Properties();
        mailProperties.put("mail.smtp.host", "smtp.mail.ru");
        mailProperties.put("mail.smtp.auth", "true");
        mailProperties.put("mail.smtp.socketFactory.port", "465");
        mailProperties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");

        Session session = Session.getInstance(mailProperties,
                new Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(login, password);
                    }
                });
        Message message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from));
        message.setRecipient(Message.RecipientType.TO, new InternetAddress("mail@sganiev.ru"));
        message.setSubject(subject);
        Multipart mainMultipart = new MimeMultipart("mixed");

        Multipart htmlMultiPart = new MimeMultipart("alternative");
        MimeBodyPart htmlPart = new MimeBodyPart();
        htmlPart.setContent(body, "text/html; charset=utf-8");
        htmlMultiPart.addBodyPart(htmlPart);

        MimeBodyPart mimeMainPart = new MimeBodyPart();
        mimeMainPart.setContent(htmlMultiPart);
        mainMultipart.addBodyPart(mimeMainPart);
        message.setContent(mainMultipart);
        Transport.send(message);

    }
}

