package ru.charityradar.api.helper;

import lombok.ToString;

import java.io.InputStream;
import java.util.Properties;

public class ProjectProperties {
    @SuppressWarnings("SpellCheckingInspection")
    @ToString
    public enum ProjectProperty {
        MAIL_SENDER_LOGIN("mail.sender.login"),
        MAIL_SENDER_PASSWORD("mail.sender.password"),
        PROGRAMMERS_MAILS("programmers.mails"),

        IMAGE_UPLOAD_PATH("image.upload.path"),
        MAIN_URL("main.url"),

        AUTH_VTBID_MASTERTOKEN_URL("auth.vtbid.mastertoken.url"),
        AUTH_VTBID_ACCESSTOKEN_URL("auth.vtbid.accesstoken.url"),
        ;

        private final String _key;
        private String _cachedValue;

        ProjectProperty(final String key) {
            _key = key;
        }

        public String getKey() {
            return _key;
        }

        public String getValue(final Properties properties) {
            if (properties == null) return _cachedValue = getProperties().getProperty(_key);
            return _cachedValue = properties.getProperty(_key);
        }

        public String getValue() {
            return getValue(_properties);
        }

        public String getCachedValue() {
            if (_cachedValue == null) return _cachedValue = getValue(_properties);
            return _cachedValue;
        }
    }

    private static Properties _properties = new Properties();

    public static Properties getProperties(){
        try (InputStream input = ProjectProperties.class.getClassLoader().getResourceAsStream("main.properties")) {
            _properties = new Properties();
            _properties.load(input);
        } catch (Exception e) {
            System.out.println("Error: Ошибка чтения файла main.properties");
        }
        return _properties;
    }
}
