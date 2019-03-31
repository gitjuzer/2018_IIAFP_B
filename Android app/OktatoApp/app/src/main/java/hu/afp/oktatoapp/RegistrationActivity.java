package hu.afp.oktatoapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class RegistrationActivity extends AppCompatActivity {

    boolean succesfulRegistration = false;
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

        Button registerButton = findViewById(R.id.registerBtn);

        registerButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(succesfulRegistration){
                    Intent main = new Intent(RegistrationActivity.this, MainActivity.class);
                    startActivity(main);
                }
            }
        });
    }



}
