package ru.charityradar.api.runner;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import ru.charityradar.api.constant.ModelWithImageType;
import ru.charityradar.api.helper.ProjectProperties.ProjectProperty;
import ru.charityradar.api.input.FundInput;
import ru.charityradar.api.service.BalanceService;
import ru.charityradar.api.service.FundService;
import ru.charityradar.api.service.UploadService;

import java.util.Objects;
import java.util.Random;

@AllArgsConstructor
@Component
public class InitialLoader implements ApplicationRunner {
    @Autowired
    final BalanceService _balanceService;
    @Autowired
    final FundService _fundService;
    @Autowired
    final UploadService _uploadService;

    /**
     * @implNote Add <i>development.db.init=true</i> to <i>main.properties</i> to run service example initialization method.
     * Also, you can <i>spring.jpa.hibernate.ddl-auto=create</i> to <i>application.properties</i> to <b>drop</b> the database each initialization.
     */
    @Override
    public void run(final ApplicationArguments args) {
        if (!Objects.equals(ProjectProperty.DEVELOPMENT_DB_INIT.getCachedValue(), "true")) return;

        final var fundImagePrefix = ProjectProperty.DEVELOPMENT_DB_INIT_FUND_IMAGES_PATH.getCachedValue() + "fund_";
        final var random = new Random(System.nanoTime());
        for (int i = 1; i < 13; i++) {
            final var I = String.valueOf(i);
            final var id = _fundService.addFund(new FundInput(
                        "Фонд " + I,
                            "",
                            "foundation" + I + "@mail.ru",
                            i < 10 ? "+7987654300" + I : "+798765430" + I,
                            "Описание фонда №" + I, random.nextFloat(5f)
                        ), _balanceService.createBalance().getId())
                    .getId();
            _uploadService.setImage(ModelWithImageType.FUND, id, fundImagePrefix + I + ".jpg");
        }
    }
}
