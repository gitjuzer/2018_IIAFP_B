package hu.afp.oktatoapp.Classes;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class User {

    //region privát mezők
    private int id;
    private String username;
    private String email;
    private String password;
    private String lastName;
    private String firstName;
    private Date created_at;
    private Date last_login;
    public static List<User> Users = new ArrayList<>();
    private Role.roleType role;
    private String token;
//endregion
    //region properties, set, get
    public String getUsername(){
        return username;
    }
    public void setUsername(String username){
        this.username = username;
    }

    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public void setPassword(String password){
        this.password = password;
    }
    public String getPassword(){
        return password;
    }

    public void setLastName(String lastName){
        this.lastName = lastName;
    }
    public String getLastName(){
        return lastName;
    }

    public void setFirstName(String firstName){
        this.firstName = firstName;
    }
    public String getFirstName(){
        return firstName;
    }

    public void setCreated_at(Date created_at){
        this.created_at = created_at;
    }
    public Date getCreated_at(){
        return created_at;
    }

    public void setLast_login(Date last_login){
        this.last_login = last_login;
    }
    public Date getLast_login(){
        return last_login;
    }

    public int getId(){
        return id;
    }
    public void setId(int id){
        this.id = id;
    }

    public Role.roleType getRole(){
        return this.role;
    }
    public void setRole(Role.roleType role){
        this.role = role;
    }

    public static List<User> getUsers(){
        return Users;
    }

    public User getUserByToken(String token){
        User user = new User();
        for (int i = 0; i < Users.size(); i++) {
            if(Users.get(i).token.equals(token)){
                user = Users.get(i);
                break;
            }
            break;
        }
        return user;
    }

//endregion

    public User(){

    }
    public User(int id, String username, String email, String password, String lastName, String firstName,
                Date created_at, Date last_login, Role.roleType role){
        super();
        this.setId(id);
        this.setUsername(username);
        this.setEmail(email);
        this.setPassword(password);
        this.setLastName(lastName);
        this.setFirstName(firstName);
        this.setCreated_at(created_at);
        this.setLast_login(last_login);
        this.setRole(role);
    }
}
