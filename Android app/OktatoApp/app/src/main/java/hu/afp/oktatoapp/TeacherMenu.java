package hu.afp.oktatoapp;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import hu.afp.oktatoapp.Classes.MyToolbarCode;
import hu.afp.oktatoapp.Classes.Token;

public class TeacherMenu extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_teacher_menu);

        //gombok, textviewok változóba kimentése
        final TextView usernameDisplay;
        ImageView logout;
        RelativeLayout toolbar = findViewById(R.id.myToolbar);
        usernameDisplay = toolbar.findViewById(R.id.title);
        usernameDisplay.setText(getIntent().getStringExtra("Username"));
        ImageButton stat;

        logout = toolbar.findViewById(R.id.logout);
        logout.setVisibility(View.VISIBLE);
        logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                MyToolbarCode.Logout(v.getContext(), String.valueOf(Token.getToken().indexOf(0)));
            }
        });
        stat = findViewById(R.id.statisticT_Button);
        stat.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent osztalystat = new Intent(TeacherMenu.this, TargyValaszto.class);
                startActivity(osztalystat);
            }
        });
    }
}
