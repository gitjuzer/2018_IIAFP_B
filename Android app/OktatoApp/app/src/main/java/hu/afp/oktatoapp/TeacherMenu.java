package hu.afp.oktatoapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class TeacherMenu extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_teacher_menu);

        //gombok, textviewok változóba kimentése
        final TextView usernameDisplay;


        usernameDisplay = findViewById(R.id.usernameT_TextView);
        usernameDisplay.setText(getIntent().getStringExtra("Username"));
    }
}
