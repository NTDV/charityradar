package ru.charityradar.api.runner;

import jdk.jshell.spi.ExecutionControl;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import ru.charityradar.api.constant.FeeStatus;
import ru.charityradar.api.constant.ModelWithImageType;
import ru.charityradar.api.helper.ProjectProperties.ProjectProperty;
import ru.charityradar.api.input.FeesInput;
import ru.charityradar.api.input.FundInput;
import ru.charityradar.api.input.NewsInput;
import ru.charityradar.api.service.*;

import java.time.LocalDate;
import java.util.Objects;
import java.util.Random;

import static ru.charityradar.api.constant.Development.throwIfNotDevelopment;

@AllArgsConstructor
@Component
public class InitialRunner implements ApplicationRunner {
    @Autowired
    final BalanceService _balanceService;
    @Autowired
    final FundService _fundService;
    @Autowired
    final FeesService _feesService;
    @Autowired
    final UploadService _uploadService;
    @Autowired
    final NewsService _newsService;
    @Autowired
    final TransactionService _transactionService;

    /**
     * @implNote Add <i>development.db.init=true</i> to <i>main.properties</i> to run service example initialization method.
     * Also, you can <i>spring.jpa.hibernate.ddl-auto=create</i> to <i>application.properties</i> to <b>drop</b> the database each initialization.
     */
    @Override
    public void run(final ApplicationArguments args) throws ExecutionControl.NotImplementedException {
        throwIfNotDevelopment();
        if (!Objects.equals(ProjectProperty.DEVELOPMENT_DB_INIT.getCachedValue(), "true")) return;

        final var fundImagePrefix = ProjectProperty.DEVELOPMENT_DB_INIT_FUND_IMAGES_PATH.getCachedValue() + "fund_";
        final var random = new Random(System.nanoTime());
        var feesIndex = 0;
        var newsIndex = 0;
        final var fundsCount = random.nextInt(12, 20);
        for (int i = 1; i < fundsCount; i++) {
            final var I = String.valueOf(i);
            final var fundId = _fundService.addFund(new FundInput(
                            "Фонд " + I,
                            "",
                            "foundation" + I + "@mail.ru",
                            i < 10 ? "+7987654300" + I : "+798765430" + I,
                            "Описание фонда №" + I, random.nextFloat(5f)
                    ), _balanceService.createBalance().getId())
                    .getId();
            _uploadService.setImage(ModelWithImageType.FUND, fundId, fundImagePrefix + I + ".jpg");

            int feesCount = random.nextInt(6);
            for (int j = 0; j <= feesCount; j++) {
                final var start = LocalDate.now().minusDays(random.nextInt(200));
                final var end = LocalDate.now().plusDays(random.nextInt(200));

                final var feeId = _feesService.addFees(new FeesInput(
                        "Сбор " + ++feesIndex,
                        random.nextInt(600_000),
                        start.toString(),
                        end.toString(),
                        "Описание сбора " + feesIndex,
                        random.nextBoolean() ? FeeStatus.COLLECTING : FeeStatus.COMPLETED,
                        random.nextInt(600_000),
                        fundId, "")).getId();
                _uploadService.setImage(ModelWithImageType.FEES, feeId, fundImagePrefix + (feesIndex % 12 + 1) + ".jpg");
            }

            int newsCount = random.nextInt(6);
            for (int j = 0; j < newsCount; j++) {
                final var newsId = _newsService.addNews(new NewsInput(
                        "Название новости " + ++newsIndex,
                        LocalDate.now().minusDays(random.nextInt(200)).toString(),
                        "Содержание новости " + newsIndex,
                        "",
                        fundId)).getId();
                _uploadService.setImage(ModelWithImageType.NEWS, newsId, fundImagePrefix + (newsIndex % 12 + 1) + ".jpg");
            }

            /*
            int transactionsCount = random.nextInt(101);
            for (int j = 1; j < transactionsCount; j++) {
                final idType = random.nextInt(3);
                final var transaction = _transactionService.addTransaction(new TransactionInput(
                        random.nextBoolean() ? TransactionType.REFILL : TransactionType.EXPENSE,
                        random.nextFloat(100_000),
                        LocalDateTime.now().minusDays(random.nextInt(200)).toString(),
                        random.nextBoolean() ? TransactionStatus.CONFIRMED : TransactionStatus.NONCONFIRMED,
                        idType == 0 ?
                ));
            }
             */
        }
    }
}
