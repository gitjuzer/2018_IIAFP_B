package hu.afp.oktatoapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;
import hu.afp.oktatoapp.MainActivity;

public class StudentMenu extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_main);

        //gombok, textviewok változóba kimentése
        final TextView usernameDisplay;


        usernameDisplay = findViewById(R.id.usernameDisplay_TextView);
        usernameDisplay.setText(getIntent().getStringExtra("Username"));
    }
}
