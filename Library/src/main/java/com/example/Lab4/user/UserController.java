package com.example.Lab4.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/registration")
    public ResponseEntity<Void> registration(@RequestBody UserDTO userDTO){
        return userService.createUser(userDTO.getUsername(), userDTO.getPwd());
    }

    @GetMapping("/test")
    public String test(){
        return "test page";
    }

    @PostMapping("/login")
    public ResponseEntity<Void> login(@RequestBody UserDTO userDTO){
        return userService.loginUser(userDTO.getUsername(), userDTO.getPwd());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteUser(@RequestParam String username){
        return userService.deleteAccount(username);
    }

}
