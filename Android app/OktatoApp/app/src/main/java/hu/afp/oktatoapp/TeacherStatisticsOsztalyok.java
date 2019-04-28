package hu.afp.oktatoapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class TeacherStatisticsOsztalyok extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_teacher_statistics_osztalyok);
    }

    @Override
    protected void onStart() {
        super.onStart();
        TextView a6, b6, a7, b7, a8, b8;
        a6 = findViewById(R.id.a6);
        b6 = findViewById(R.id.b6);
        a7 = findViewById(R.id.a7);
        b7 = findViewById(R.id.b7);
        a8 = findViewById(R.id.a8);
        b8 = findViewById(R.id.b8);
        Intent i = getIntent();
        if (i.getStringExtra("targy").equals("tortenelem")) {
            a6.setText("1.2");
            b6.setText("1.8");
            a7.setText("2.2");
            b7.setText("2.8");
            a8.setText("3.2");
            b8.setText("3.8");
        }
        else if(i.getStringExtra("targy").equals("matematika")) {
            a6.setText("5.0");
            b6.setText("5.0");
            a7.setText("5.0");
            b7.setText("5.0");
            a8.setText("5.0");
            b8.setText("5.0");
        }
        else if(i.getStringExtra("targy").equals("magyarnyelv")) {
            a6.setText("4.0");
            b6.setText("4.1");
            a7.setText("2.5");
            b7.setText("3.6");
            a8.setText("3.8");
            b8.setText("4.8");
        }
        else if(i.getStringExtra("targy").equals("fizika")) {
            a6.setText("1.1");
            b6.setText("1.1");
            a7.setText("1.1");
            b7.setText("1.1");
            a8.setText("1.1");
            b8.setText("1.1");
        }
    }
}
