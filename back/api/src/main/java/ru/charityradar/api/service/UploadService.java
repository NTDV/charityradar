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
    Properties properties = ProjectProperties.getProperties();
    public String UPLOAD_DIRECTORY = properties.getProperty("image.upload.path");
    public String[] SPECIFIC_DIR = {"fund/", "news/", "fees/"};


    public ResponseEntity<Object> uploadImage(Model model, MultipartFile file,
                                              Integer type) {
        return uploadImage(model, file, type, -1);
    }

    public ResponseEntity<Object> uploadImage(Model model, MultipartFile file,
                                              int type, Integer id) { //TODO: проверка авторизации
        try {
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY + SPECIFIC_DIR[type], file.getOriginalFilename());
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
                if (id > -1) setImage(ModelWithImageType.parse(type), id, fileNameAndPath.toString());
            }

            return ResponseHandler.generateUploadResponse(message, httpStatus, fileNameAndPath.toString());
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseHandler.generateUploadResponse("Upload error!", HttpStatus.BAD_REQUEST, null);
        }
    }

    public void setImage(ModelWithImageType type, int id, String fileNameAndPath) {
        fileNameAndPath = fileNameAndPath.substring(ProjectProperties.ProjectProperty.IMAGE_UPLOAD_PATH.getCachedValue().length());
        if      (type == ModelWithImageType.FUND) _fundService.setImage(_fundService.getFundById(id), fileNameAndPath);
        else if (type == ModelWithImageType.NEWS) _newsService.setImage(_newsService.getNewsById(id), fileNameAndPath);
        else if (type == ModelWithImageType.FEES) _feesService.setImage(_feesService.getFeesById(id), fileNameAndPath);
    }

    public Boolean isRightImageType (String contentType) {
        return contentType.equals("image/png") || contentType.equals("image/jpeg");
    }
}

