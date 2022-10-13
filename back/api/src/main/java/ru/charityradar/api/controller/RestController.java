package ru.charityradar.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.charityradar.api.helper.AuthHash;
import ru.charityradar.api.helper.Helper;
import ru.charityradar.api.model.Auth;
import ru.charityradar.api.service.AuthService;

import org.springframework.stereotype.Controller;

import java.security.NoSuchAlgorithmException;

@Controller
public class RestController {

    @Autowired
    private final AuthService _authService;

    public RestController(AuthService authService) {
        _authService = authService;
    }


    @GetMapping("/activate_email/{token}")
    public String activateAuth(@PathVariable String token, Model model) {
        Auth auth = _authService.getAuthByToken(token);

        if (auth.getId() > 0) {
            _authService.setConfirmed(auth);
            return "activating_success";
        } else {
            return "activating_failure";
        }
    }
    @GetMapping("/reset_password/{token}")
    public String resetPassword(@PathVariable String token, Model model) {
        Auth auth = _authService.getAuthByToken(token);
        model.addAttribute("token", token);
        return "reset_password";
    }
    @PostMapping("/reset_password_confirm")
    public String resetPasswordConfirm(@RequestParam String token, @RequestParam String pass1, @RequestParam String pass2, Model model) throws NoSuchAlgorithmException {
        if (pass1.equals(pass2) && pass1.matches(Helper.passRegex)) {
            Auth auth = _authService.getAuthByToken(token);
            if (auth != null && auth.getLogin() != null) {
                _authService.setNewPassword(auth, pass1);
                return "reset_success";
            } else {
                model.addAttribute("token", token);
                return "negativePassword";
            }
        } else {
            model.addAttribute("token", token);
            return "negativePassword";
        }
    }

}
