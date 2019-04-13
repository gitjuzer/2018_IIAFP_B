package hu.afp.oktatoapp.Classes;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Token {

    //region privát mezők
    private int tokenId;
    private String token;
    private Date created_at;
    private Date expires_at;
    private boolean isActive;
    private int userId;
    private String username;
    public static List<Token> Tokens = new ArrayList<>();
    //endregion

    //region propertyk, get, set
    public int getTokenId(){
        return tokenId;
    }
    public void setTokenId(int tokenId){
        this.tokenId = tokenId;
    }
    public String getToken(){
        return token;
    }
    public void setToken(String token){
        this.token = token;
    }
    public Date getCreated_at(){
        return created_at;
    }
    public void setCreated_at(Date created_at){
        this.created_at = created_at;
    }
    public Date getExpires_at(){
        return expires_at;
    }
    public void setExpires_at(Date expires_at){
        this.expires_at = expires_at;
    }
    public boolean getisActive(){
        return isActive;
    }
    public void setisActive(boolean isActive){
        this.isActive = isActive;
    }
    public void setUserId(int userId){
        this.userId = userId;
    }
    public int getUserId(){
        return userId;
    }
    public String getUsername(){
        return username;
    }
    public void setUsername(String username){
        this.username = username;
    }
    public static List<Token> getTokens(){
        return Tokens;
    }
    //endregion

    public Token(){

    }
    public Token(int tokenId, String token, Date created_at, Date expires_at, boolean isActive){
        super();
        this.setTokenId(tokenId);
        this.setToken(token);
        this.setCreated_at(created_at);
        this.setExpires_at(expires_at);
        this.setisActive(isActive);
    }
}
