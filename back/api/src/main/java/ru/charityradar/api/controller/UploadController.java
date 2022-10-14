package ru.charityradar.api.controller;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import ru.charityradar.api.service.UploadService;

@Controller
@NoArgsConstructor
public class UploadController {

    @Autowired
    private UploadService _uploadService;


    @PostMapping("/upload")
    public ResponseEntity<Object> uploadFile(Model model, @RequestParam("image") MultipartFile file,
                                              @RequestParam(value = "type", required = false) Integer type,
                                              @RequestParam(value = "id", required = false) Integer id) {
        if (id == null)
            return _uploadService.uploadFile(model, file, type);
        else
            return _uploadService.uploadFile(model, file, type, id);
    }
}
