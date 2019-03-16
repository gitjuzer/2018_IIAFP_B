package hu.afp.oktatoapp;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        View toolbar, student, teacher;
        ImageView logo, studentLogo, teacherLogo;
        TextView studentTV,teacherTV;

        toolbar = findViewById(R.id.myToolbar);
        student = findViewById(R.id.studentBtn);
        teacher = findViewById(R.id.teacherBtn);

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

    }
}
