package hu.afp.oktatoapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.common.hash.Hashing;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import hu.afp.oktatoapp.Classes.Global;
import hu.afp.oktatoapp.Classes.Role;
import hu.afp.oktatoapp.Classes.Token;

public class MainActivity extends AppCompatActivity {

    boolean studentBtnIsClicked;
    boolean teacherBtnIsClicked;
    boolean ableToLogin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final EditText username, password;
        final View toolbar, student, teacher;
        ImageView logo, studentLogo, teacherLogo;
        TextView studentTV, teacherTV;
        Button login, register;
        final LinearLayout teacherID;

        ableToLogin = false;
        toolbar = findViewById(R.id.myToolbar);

        student = findViewById(R.id.studentBtn);
        student.findViewById(R.id.background).setBackground(getDrawable(R.drawable.disabled_circle));

        teacher = findViewById(R.id.teacherBtn);
        teacher.findViewById(R.id.background).setBackground(getDrawable(R.drawable.disabled_circle));

        login = findViewById(R.id.loginBtn);
        register = findViewById(R.id.registerBtn);
        username = findViewById(R.id.usernameET);
        password = findViewById(R.id.passwordET);
        teacherID = findViewById(R.id.teacherID);

        logo = toolbar.findViewById(R.id.logo);
        studentLogo = student.findViewById(R.id.logo);
        studentTV = student.findViewById(R.id.buttonText);
        teacherLogo = teacher.findViewById(R.id.logo);
        teacherTV = teacher.findViewById(R.id.buttonText);


        logo.setImageDrawable(getDrawable(R.drawable.ic_puzzle));
        studentLogo.setImageDrawable(getDrawable(R.drawable.ic_student));
        teacherLogo.setImageDrawable(getDrawable(R.drawable.ic_teacher));
        studentTV.setText(R.string.student);
        teacherTV.setText(R.string.teacher);

        student.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                student.findViewById(R.id.background).setBackground(getDrawable(R.drawable.circle));
                teacher.findViewById(R.id.background).setBackground(getDrawable(R.drawable.disabled_circle));
                studentBtnIsClicked = true;
                teacherBtnIsClicked = false;
                if (teacherID.getVisibility() == View.VISIBLE)
                    teacherID.setVisibility(View.GONE);
            }
        });
        teacher.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                student.findViewById(R.id.background).setBackground(getDrawable(R.drawable.disabled_circle));
                teacher.findViewById(R.id.background).setBackground(getDrawable(R.drawable.circle));
                teacherBtnIsClicked = true;
                studentBtnIsClicked = false;
            }
        });
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (Global.isNetworkConnected(v.getContext())) {
                    String temp1 = username.getText().toString();
                    String temp2 = password.getText().toString();

                    sendLoginData(temp1, temp2, studentBtnIsClicked ? Role.roleType.STUDENT.toString() : Role.roleType.TEACHER.toString());

                    if (!teacherBtnIsClicked && !studentBtnIsClicked) {
                        Toast errorToast = Toast.makeText(MainActivity.this, R.string.error1, Toast.LENGTH_SHORT);
                        errorToast.show();
                    }
                    if (studentBtnIsClicked && ableToLogin) {
                        Intent student = new Intent(MainActivity.this, StudentMenu.class);
                        student.putExtra("Username", username.getText().toString());
                        startActivity(student);
                    }
                    if (teacherBtnIsClicked && ableToLogin) {
                        Intent teacher = new Intent(MainActivity.this, TeacherMenu.class);
                        teacher.putExtra("Username", username.getText().toString());
                        startActivity(teacher);
                    }
                } else
                    Toast.makeText(v.getContext(), R.string.check_connection, Toast.LENGTH_SHORT).show();
            }
        });
        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent registrationIntent = new Intent(MainActivity.this, RegistrationActivity.class);
                startActivity(registrationIntent);
            }
        });
    }

    private void sendLoginData(String username, String password, String type) {
        String url = "https://oktatoappapi.herokuapp.com/OktatoAppAPI/users/login";
        JSONObject jsonObject = new JSONObject();
        final String hashedPass = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();
        jsonObject = CreateNewUser(username, hashedPass, type);
        final String requestBody = jsonObject.toString();
        RequestQueue queue = Volley.newRequestQueue(this);
        StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                response -> {

                    int statusCode = 0;
                    String description;

                    int tokenId;
                    String token;
                    Date created_at;
                    Date expires_at;
                    boolean isActive;
                    int userId;
                    String username1;
                    JSONArray responseInJSONArray;

                    try {
                        JSONObject jsonObject1 = new JSONObject(response);

                        statusCode = jsonObject1.getInt("status_code");
                        description = jsonObject1.getString("description");

                        if (statusCode == 201) {
                            ableToLogin = true;
                        }

                        responseInJSONArray = jsonObject1.getJSONArray("data");
                        for (int i = 0; i < responseInJSONArray.length(); i++) {

                            DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.ENGLISH);

                            JSONObject obj = responseInJSONArray.getJSONObject(i);

                            tokenId = obj.getInt("id");
                            token = obj.getString("token");
                            created_at = format.parse((obj.getString("created_at").replaceAll("\\+0([0-9]){1}\\:00", "+0$100")));
                            expires_at = format.parse((obj.getString("expires_at").replaceAll("\\+0([0-9]){1}\\:00", "+0$100")));
                            isActive = obj.getInt("is_active") == 1;
                            username1 = obj.getString("username");

                            Token tempToken = new Token(tokenId, token, created_at, expires_at, isActive, username1);

                        }
                        //TESZT a tokenek adatainak kiiírására
                           /* List<Token> temp = Token.getTokens();
                            for (int j = 0; j < temp.size(); j++) {
                                Log.d("TOKEN ADATAI:////////////", " " + temp.get(i).getCreated_at() + " " + temp.get(i).getExpires_at());
                            }*/

                    } catch (JSONException e) {
                        e.printStackTrace();
                        if (statusCode == 401) {
                            ableToLogin = false;
                        }
                    } catch (ParseException e) {
                        e.printStackTrace();
                    }


                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("Error.Response", " " + error.getMessage());
                        if (error.networkResponse.statusCode == 401) {
                            ableToLogin = false;
                            Toast errorToast = Toast.makeText(MainActivity.this, "Hibás adatok.",
                                    Toast.LENGTH_SHORT);
                            errorToast.show();
                        }
                    }
                }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public byte[] getBody() {
                try {
                    return requestBody == null ? null : requestBody.getBytes("utf-8");
                } catch (UnsupportedEncodingException e) {
                    VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", requestBody, "utf-8");
                    return null;
                }
            }
        };
        queue.add(postRequest);
        Log.d("POST_REQ", " " + requestBody);
    }

    public JSONObject CreateNewUser(String username, String password, String type) {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("username", username);
            jsonObject.put("password", password);
            if ("TEACHER".equals(type) || "STUDENT".equals(type) || "Admin".equals(type)) {
                jsonObject.put("login_type", type);
                return jsonObject;
            }
            return null;
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return null;
    }
}
