package hu.afp.oktatoapp.Classes;

public class Role {
    public enum roleType {
        TEACHER,
        STUDENT,
        Admin
    }
    private String role_description;

    public String getRole_Description(){
        return role_description;
    }
    public void setRole_description(String description){
        this.role_description = description;
    }
}

