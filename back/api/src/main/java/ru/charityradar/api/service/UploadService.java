package ru.charityradar.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import ru.charityradar.api.constant.ModelWithImageType;
import ru.charityradar.api.helper.ProjectProperties;
import ru.charityradar.api.helper.ResponseHandler;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Objects;
import java.util.Properties;

@Service
public class UploadService {

    @Autowired
    private FeesService _feesService;
    @Autowired
    private NewsService _newsService;
    @Autowired
    private FundService _fundService;
    @Autowired
    private TransactionService _transactionService;
    Properties properties = ProjectProperties.getProperties();
    public String UPLOAD_DIRECTORY = properties.getProperty("image.upload.path");
    public String[] SPECIFIC_DIR = {"fund/", "news/", "fees/", "transactions/"};

    final ArrayList<String> allowedContentTypes = new ArrayList<>() {{
        add("application/msword");
        add("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
        add("application/pdf");
        add("application/pdf");
        add("application/vnd.ms-excel");
        add("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        add("text/rtf");
        add("image/png");
        add("image/jpeg");
    }};

    public ResponseEntity<Object> uploadFile(Model model, MultipartFile file,
                                              Integer type) {
        return uploadFile(model, file, type, -1);
    }

    public ResponseEntity<Object> uploadFile(Model model, MultipartFile file,
                                              Integer type, Integer id) { //TODO: проверка авторизации
        try {
            System.out.println(file.getContentType());
            String dir = type != null && SPECIFIC_DIR.length > type ? SPECIFIC_DIR[type] : "default/";
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY + dir, file.getOriginalFilename());
            HttpStatus httpStatus = HttpStatus.OK;
            String message = "Successfully uploaded!";
            if(!isRightImageType(Objects.requireNonNull(file.getContentType()))) {
                message = "Wrong content type!";
                httpStatus = HttpStatus.BAD_REQUEST;
            } else if (Files.exists(fileNameAndPath)) {
                message = "File already exist!";
                httpStatus = HttpStatus.BAD_REQUEST;
            } else {
                Path parentDir = fileNameAndPath.getParent();
                if (!Files.exists(parentDir)) {
                    Files.createDirectories(parentDir);
                }
                Files.write(fileNameAndPath, file.getBytes());
                if (id > -1) setFilePath(ModelWithImageType.parse(type), id, fileNameAndPath.toString());
            }

            return ResponseHandler.generateUploadResponse(message, httpStatus, fileNameAndPath.toString());
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseHandler.generateUploadResponse("Upload error!", HttpStatus.BAD_REQUEST, null);
        }
    }

    public void setFilePath(ModelWithImageType type, int id, String fileNameAndPath) {
        fileNameAndPath = fileNameAndPath.substring(ProjectProperties.ProjectProperty.IMAGE_UPLOAD_PATH.getCachedValue().length());
        if      (type == ModelWithImageType.FUND) _fundService.setImage(_fundService.getFundById(id), fileNameAndPath);
        else if (type == ModelWithImageType.NEWS) _newsService.setImage(_newsService.getNewsById(id), fileNameAndPath);
        else if (type == ModelWithImageType.FEES) _feesService.setImage(_feesService.getFeesById(id), fileNameAndPath);
        else if (type == ModelWithImageType.TRANSACTION) _transactionService.setDocument(_transactionService.getTransactionById(id), fileNameAndPath);
    }

    public Boolean isRightImageType (String contentType) {
        return (contentType.equals("image/png") || contentType.equals("image/jpeg") || allowedContentTypes.contains(contentType));
    }
}

