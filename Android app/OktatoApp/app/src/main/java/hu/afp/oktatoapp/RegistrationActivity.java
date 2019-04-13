package hu.afp.oktatoapp;

import android.accounts.Account;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.UnsupportedEncodingException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

import hu.afp.oktatoapp.Classes.User;

public class RegistrationActivity extends AppCompatActivity {

    private boolean succesfulRegistration = false;
    private boolean studentButtonIsClicked = false;
    private boolean teacherButtonIsClicked = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        final EditText username = findViewById(R.id.username_ET1);
        final EditText password = findViewById(R.id.passwordET);
        final EditText retryPassword = findViewById(R.id.retryPassword_ET);
        final EditText emailAddress = findViewById(R.id.email_ET);
        final EditText firstName = findViewById(R.id.firstName_ET);
        final EditText lastName = findViewById(R.id.lastName_ET);


        final RelativeLayout studentButton = findViewById(R.id.studentBtn);
        final RelativeLayout teacherButton = findViewById(R.id.teacherBtn);
        final TextView studentView, teacherView;
        ImageView teacherLogo, studentLogo, logo;
        Button registerButton = findViewById(R.id.registerBtn);

        studentButton.findViewById(R.id.background).setBackground(getDrawable(R.drawable.disabled_circle));
        teacherButton.findViewById(R.id.background).setBackground(getDrawable(R.drawable.disabled_circle));

        studentView = studentButton.findViewById(R.id.buttonText);
        teacherView = teacherButton.findViewById(R.id.buttonText);
        studentView.setText(R.string.student);
        teacherView.setText(R.string.teacher);

        logo = findViewById(R.id.logo);
        teacherLogo = teacherButton.findViewById(R.id.logo);
        teacherLogo.setImageDrawable(getDrawable(R.drawable.ic_teacher));
        studentLogo = studentButton.findViewById(R.id.logo);
        studentLogo.setImageDrawable(getDrawable((R.drawable.ic_student)));

        studentButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                studentButton.findViewById(R.id.background).setBackground(getDrawable(R.drawable.circle));
                teacherButton.findViewById(R.id.background).setBackground(getDrawable(R.drawable.disabled_circle));
                studentButtonIsClicked = true;
                teacherButtonIsClicked = false;
            }
        });

        teacherButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                teacherButton.findViewById(R.id.background).setBackground(getDrawable(R.drawable.circle));
                studentButton.findViewById(R.id.background).setBackground(getDrawable(R.drawable.disabled_circle));
                studentButtonIsClicked = false;
                teacherButtonIsClicked = true;
            }
        });
        registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                String realPassword = password.getText().toString();
                String realRetryPassword = retryPassword.getText().toString();
                String realUsername = username.getText().toString();
                String realEmail = emailAddress.getText().toString();
                String realFirstName = firstName.getText().toString();
                String realLastName = lastName.getText().toString();

                if (!realPassword.equals(realRetryPassword)){
                    Toast errorToast = Toast.makeText(RegistrationActivity.this, "Nem egyeznek meg a " +
                            "jelszavak.", Toast.LENGTH_SHORT);
                    errorToast.show();
                }
                /*else if(emptyDataExists(realUsername, realPassword, realRetryPassword, realEmail, realFirstName, realLastName)){
                    Toast errorToast = Toast.makeText(RegistrationActivity.this, "Minden adatot kötelező " +
                            "kitölteni.", Toast.LENGTH_SHORT);
                    errorToast.show();
                }*/                             //  ez a szar nem működik valamiért
               else {
                    if (studentButtonIsClicked) {
                        sendRegistrationData(realUsername, realEmail, realPassword, realFirstName, realLastName, AccountType.Student);
                        Toast.makeText(getBaseContext(), "Sikeres regisztráció!", Toast.LENGTH_SHORT).show();

                    } else if (teacherButtonIsClicked) {
                        Toast.makeText(getBaseContext(),"Tanárként való regisztráláshoz tudnod kell a " +
                                "központi kódot.", Toast.LENGTH_SHORT).show();

                        sendRegistrationData(realUsername, realEmail, realPassword, realFirstName, realLastName, AccountType.Teacher);
                    } else {
                        Toast errorToast = Toast.makeText(RegistrationActivity.this, "Ki kell választanod " +
                                        "legalább az egyik menüpontot. Tanárként, vagy diákként szeretnél regisztrálni?",
                                Toast.LENGTH_SHORT);
                        errorToast.show();
                    }
                }
            }
        });

    }

    private boolean emptyDataExists(String username, String password, String retryPassword, String email,
                                   String firstName, String lastName){
        if(TextUtils.isEmpty(username) || TextUtils.isEmpty(password) || TextUtils.isEmpty(retryPassword) || TextUtils.isEmpty(email)
        || TextUtils.isEmpty(firstName) || TextUtils.isEmpty(lastName)){
            return false;
        }
        else
            return true;
    }
    private void sendRegistrationData(String username, String email, final String password,
                                      String firstName, String lastName, AccountType accountType){
        String url = "https://oktatoappapi.herokuapp.com/OktatoAppAPI/users/signup";

        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("username", username);
            jsonObject.put("password", password);
            jsonObject.put("email", email);
            jsonObject.put("first_name", firstName);
            jsonObject.put("last_name", lastName);
            jsonObject.put("account_type", accountType);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        final String requestBody = jsonObject.toString();
        RequestQueue queue = Volley.newRequestQueue(this);
        StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        int statusCode = 0;
                        String description;

                        int id = 0;
                        String username;
                        String email;
                        String firstName;
                        String lastName;
                        Date created_at;
                        Date last_login;
                        AccountType accountType;
                        JSONArray responseInJSONArray;

                        try{
                            JSONObject jsonObject = new JSONObject(response);

                            statusCode = jsonObject.getInt("status_code");
                            description = jsonObject.getString("description");
                            if(statusCode == 201){
                                succesfulRegistration = true;
                            }
                            responseInJSONArray = jsonObject.getJSONArray("data");
                            for (int i = 0; i < responseInJSONArray.length(); i++) {
                                DateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.ENGLISH);

                                JSONObject obj = responseInJSONArray.getJSONObject(i);
                                id = obj.getInt("id");
                                username = obj.getString("username");
                                email = obj.getString("email");
                                firstName = obj.getString("first_name");
                                lastName = obj.getString("last_name");
                                created_at = format.parse((obj.getString("created_at").replaceAll("\\+0([0-9]){1}\\:00", "+0$100")));
                                last_login = format.parse((obj.getString("created_at").replaceAll("\\+0([0-9]){1}\\:00", "+0$100")));
                                accountType = AccountType.valueOf(obj.getString("account_type"));

                                User newUser = new User(id, username, email, password, lastName, firstName, created_at
                                , last_login);
                            }
                        }

                         catch (JSONException e) {
                            if(statusCode == 400){
                                succesfulRegistration = false;
                            }
                            e.printStackTrace();
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("Error.Response", " " + error.getMessage());
                        if(error.networkResponse.statusCode == 400){
                            succesfulRegistration = false;
                            Toast errorToast = Toast.makeText(RegistrationActivity.this, "Hiányzó adatok!", Toast.LENGTH_SHORT);
                            errorToast.show();
                        }
                        if(error.networkResponse.statusCode == 409){
                            succesfulRegistration = false;
                            Toast errorToast = Toast.makeText(RegistrationActivity.this, "Már létezik ilyen felhasználó!", Toast.LENGTH_SHORT);
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
        Log.d("POST_REQ", " "+ requestBody);
    }


}
