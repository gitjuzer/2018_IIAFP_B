package hu.afp.oktatoapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Spinner;

public class TargyValaszto extends AppCompatActivity {

    Spinner spinner;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_targy_valaszto);
        spinner = findViewById(R.id.spinner);
        String[] targyak = new String[] {"Válasszon tantárgyat a legördülő menüből!", "Történelem", "Matematika", "Magyar nyelv", "Fizika"};
        ArrayAdapter<String> arrayAdapter =new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, targyak);
        spinner.setAdapter(arrayAdapter);

        spinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if(spinner.getSelectedItemPosition() == 1) {
                    Intent intent = new Intent(TargyValaszto.this, );
                    String targy = "tortenelem";
                    intent.putExtra("targy", targy);
                    startActivity(intent);
                }
                if(spinner.getSelectedItemPosition() == 2) {
                    Intent intent = new Intent(TargyValaszto.this, );
                    String targy = "matematika";
                    intent.putExtra("targy", targy);
                    startActivity(intent);
                }
                if(spinner.getSelectedItemPosition() == 3) {
                    Intent intent = new Intent(TargyValaszto.this,);
                    String targy = "magyarnyelv";
                    intent.putExtra("targy", targy);
                    startActivity(intent);
                }
                if(spinner.getSelectedItemPosition() == 4) {
                    Intent intent = new Intent(TargyValaszto.this, );
                    String targy = "fizika";
                    intent.putExtra("targy", targy);
                    startActivity(intent);
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
    }

    @Override
    protected void onStart() {
        super.onStart();
        spinner.setSelection(0);
    }
}
