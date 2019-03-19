package hu.afp.oktatoapp;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import android.content.Intent;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.VolleyLog;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.common.hash.Hashing;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;

public class MainActivity extends AppCompatActivity {

    boolean studentBtnIsClicked;
    boolean teacherBtnIsClicked;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        final EditText username, password;
        View toolbar, student, teacher;
        ImageView logo, studentLogo, teacherLogo;
        TextView studentTV, teacherTV;
        Button login, register;




        toolbar = findViewById(R.id.myToolbar);
        student = findViewById(R.id.studentBtn);
        teacher = findViewById(R.id.teacherBtn);
        login = findViewById(R.id.loginBtn);
        register = findViewById(R.id.registerBtn);
        username = findViewById(R.id.usernameET);
        password = findViewById(R.id.passwordET);

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
                studentBtnIsClicked = true;
                teacherBtnIsClicked = false;
            }
        });
        teacher.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                teacherBtnIsClicked = true;
                studentBtnIsClicked = false;
            }
        });
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String temp1 = username.getText().toString();
                String temp2 = password.getText().toString();
                if (!("".contentEquals(temp1)) && !("".contentEquals(temp2)))
                    sendLoginData(temp1, temp2);

                if (teacherBtnIsClicked == false && studentBtnIsClicked == false){
                    Toast errorToast = Toast.makeText(MainActivity.this, "Ki kell választanod " +
                            "legalább az egyik menüpontot. Tanár, vagy diákként szeretnél belépni?",
                            Toast.LENGTH_SHORT);
                    errorToast.show();
                }
                if (studentBtnIsClicked == true) {
                    Intent student = new Intent(MainActivity.this, StudentMenu.class);
                    student.putExtra("Username", username.getText().toString());
                    startActivity(student);
                }
                if (teacherBtnIsClicked == true) {
                    Intent teacher = new Intent(MainActivity.this, TeacherMenu.class);
                    teacher.putExtra("Username", username.getText().toString());
                    startActivity(teacher);
                }
            }
        });
    }
    private void sendLoginData(String username, String password) {
        /*POST: username, password JSON formátumban*/
        String url = "example.com/OktatoiAppAPI/session";
        final String hashedPass = Hashing.sha256().hashString(password, StandardCharsets.UTF_8).toString();
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("username",username);
            jsonObject.put("password",hashedPass);

        } catch (JSONException e) {
            e.printStackTrace();
        }
        final String requestBody = jsonObject.toString();
        RequestQueue queue = Volley.newRequestQueue(this);
        StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Toast.makeText(getBaseContext(), "Logged in.", Toast.LENGTH_SHORT).show();
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("Error.Response", error.getMessage());
                    }
                }) {
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }

            @Override
            public byte[] getBody(){
                try {
                    return requestBody == null ? null : requestBody.getBytes("utf-8");
                } catch (UnsupportedEncodingException e) {
                    VolleyLog.wtf("Unsupported Encoding while trying to get the bytes of %s using %s", requestBody, "utf-8");
                    return null;
                }
            }
        };
        //queue.add(postRequest);
        Log.d("POST_REQ",requestBody);
    }
}