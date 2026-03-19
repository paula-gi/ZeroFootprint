package com.zerofootprint.backend.controller;

import com.zerofootprint.backend.dto.UserDTO;
import com.zerofootprint.backend.model.User;
import com.zerofootprint.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getUsers();
    }

    @PostMapping
    public User createUser(@RequestBody UserDTO userDTO){
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        return userService.createUser(user);
    }
}