package hu.afp.oktatoapp;

import android.content.Intent;
import android.media.Image;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;

import hu.afp.oktatoapp.Classes.Token;

public class StudentMenu extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_menu);

        //gombok, textviewok változóba kimentése
        final TextView usernameDisplay;


        usernameDisplay = findViewById(R.id.usernameDisplay_TextView);
        usernameDisplay.setText(getIntent().getStringExtra("Username"));
        ImageButton statistic, logoutButton;
        statistic = findViewById(R.id.statistic_button);
        logoutButton = findViewById(R.id.imageButton_logoutButton);

        statistic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent studentStatistic = new Intent(StudentMenu.this, StudentStatistics.class);
                startActivity(studentStatistic);
            }
        });
        /*logoutButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String currentUsername = usernameDisplay.getText().toString();
                String currentUsersToken = Token.getTokenByUsername(currentUsername);
                for (int i = 0; i < Token.getTokens().size(); i++) {
                    if (Token.getTokens().get(i).getToken().equals(currentUsersToken)) {
                        Token.getTokens().remove(Token.getTokens().get(i));
                    }
                }
            }
        });*/
    }

}
