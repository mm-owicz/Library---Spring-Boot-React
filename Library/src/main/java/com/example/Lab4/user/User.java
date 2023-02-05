package com.example.Lab4.user;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="user")
public class User {

    @Id
    private String username;

    private String pwd;

    public String getUsername() {
        return username;
    }

    public void setUsername(String user) {
        this.username = user;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}