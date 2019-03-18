package hu.afp.oktatoapp;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

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
                //Student mode selected
            }
        });
        teacher.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //Teacher mode selected
            }
        });
        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String temp1 = username.getText().toString();
                String temp2 = password.getText().toString();
                if (!("".contentEquals(temp1)) && !("".contentEquals(temp2)))
                    sendLoginData(temp1, temp2);
            }
        });
    }

    private void sendLoginData(String username, String password) {
        //JSON objektum küldése username, password mezőkkel
    }
}
