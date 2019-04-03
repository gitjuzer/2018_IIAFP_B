package hu.afp.oktatoapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
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

import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.UnsupportedEncodingException;

public class RegistrationActivity extends AppCompatActivity {

    private boolean succesfulRegistration = false;
    private boolean studentButtonIsClicked = false;
    private boolean teacherButtonIsClicked = true;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_registration);

        EditText username = findViewById(R.id.usernameET);
        EditText password = findViewById(R.id.passwordET);
        EditText retryPasswrd = findViewById(R.id.retryPassword_ET);
        EditText emailAddress = findViewById(R.id.email_ET);
        EditText firstName = findViewById(R.id.firstName_ET);
        EditText lastName = findViewById(R.id.lastName_ET);

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

                if(studentButtonIsClicked) {
                    //sendRegistrationData();
                }
                else if (teacherButtonIsClicked){
                 // Validate teacher registration with some sort of password or something.
                 //sendRegistrationData();
                }
                else {
                    Toast errorToast = Toast.makeText(RegistrationActivity.this, "Ki kell választanod " +
                                    "legalább az egyik menüpontot. Tanárként, vagy diákként szeretnél regisztrálni?",
                            Toast.LENGTH_SHORT);
                    errorToast.show();
                }
            }
        });

    }

    private void sendRegistrationData(String username, String email, String password,
                                       String firstName, String lastName){
        NukeSSLCerts.nuke();
        String url = "https://10.0.2.2:3000/OktatoAppAPI/users/signup";

        //final String hashedPass = password;
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("username", username);
            jsonObject.put("password", password);
            //jsonObject.put("retryPassword", retryPassword);
            jsonObject.put("email", email);
            jsonObject.put("first_name", firstName);
            jsonObject.put("last_name", lastName);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        final String requestBody = jsonObject.toString();
        RequestQueue queue = Volley.newRequestQueue(this);
        StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(getBaseContext(), "Sikeres regisztráció.", Toast.LENGTH_SHORT).show();
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("Error.Response", " " + error.getMessage());
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
