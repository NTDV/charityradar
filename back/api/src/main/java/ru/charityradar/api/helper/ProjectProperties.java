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

        DEVELOPMENT_TOKEN_AUTOREFRESH("development.token.autorefresh"),
        DEVELOPMENT_DB_INIT("development.db.init"),
        DEVELOPMENT_DB_INIT_FUND_IMAGES_PATH("development.db.init.fundimagespath"),
        IMAGE_UPLOAD_PATH("image.upload.path"),
        MAIN_URL("main.url"),

        AUTH_VTBID_MASTER_TOKEN_URL("auth.vtbid.mastertoken.url"),
        AUTH_VTBID_ACCESS_TOKEN_URL("auth.vtbid.accesstoken.url"),
        AUTH_VTBID_ME_URL("auth.vtbid.me.url"),
        AUTH_VTBID_LOGOUT_URL("auth.vtbid.logout.url"),

        CARDINFO_VTB_CREDENTIALS_URL("cardinfo.vtb.credentials.url"),
        CARDINFO_VTB_CVV_URL("cardinfo.vtb.cvv.url"),
        CARDINFO_VTB_TOKEN_URL("cardinfo.vtb.token.url"),
        CARDINFO_VTB_TOKENS_URL("cardinfo.vtb.tokens.url"),

        CONSTANT_X_IBM_CLIENT_ID("constant.x-ibm-client-id"),
        CONSTANT_X_PARTNER_ID("constant.x-partner-id"),
        CONSTANT_X_CLIENT_CHANNEL_WEB("constant.x-client-channel.web"),
        CONSTANT_X_CLIENT_CHANNEL_MOBILE("constant.x-client-channel.mobile"),
        ;

        private final String _key;
        private String _cachedValue;

        ProjectProperty(final String key) {
            _key = key;
        }

        @SuppressWarnings("unused")
        public String getKey() {
            return _key;
        }

        public String getValue(final Properties properties) {
            if (properties == null) return _cachedValue = getProperties().getProperty(_key);
            return _cachedValue = properties.getProperty(_key);
        }

        @SuppressWarnings("unused")
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
