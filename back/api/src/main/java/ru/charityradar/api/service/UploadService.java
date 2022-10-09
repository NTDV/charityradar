package ru.charityradar.api.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import ru.charityradar.api.helper.ProjectProperties;
import ru.charityradar.api.helper.ResponseHandler;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;
import java.util.Properties;

@Service
public class UploadService {


    Properties properties = ProjectProperties.getProperties();
    public String UPLOAD_DIRECTORY = properties.getProperty("image.upload.path");


    public ResponseEntity<Object> uploadImage(Model model, @RequestParam("image") MultipartFile file) { //TODO: проверка авторизации
        try {
            Path fileNameAndPath = Paths.get(UPLOAD_DIRECTORY, file.getOriginalFilename());
            HttpStatus httpStatus = HttpStatus.OK;
            String message = "Successfully uploaded!";
            if(!isRightImageType(Objects.requireNonNull(file.getContentType()))) {
                message = "Wrong content type!";
                httpStatus = HttpStatus.BAD_REQUEST;
            } else if (Files.exists(fileNameAndPath)) {
                message = "File already exist!";
                httpStatus = HttpStatus.BAD_REQUEST;
            } else {
                Files.write(fileNameAndPath, file.getBytes());
            }

            return ResponseHandler.generateUploadResponse(message, httpStatus, fileNameAndPath.toString());
        } catch (Exception ex) {
            return ResponseHandler.generateUploadResponse("Upload error!", HttpStatus.BAD_REQUEST, null);
        }
    }

    public Boolean isRightImageType (String contentType) {
        return contentType.equals("image/png") || contentType.equals("image/jpeg");
    }
}

