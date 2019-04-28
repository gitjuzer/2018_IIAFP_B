package hu.afp.oktatoapp;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.anychart.AnyChart;
import com.anychart.AnyChartView;
import com.anychart.chart.common.dataentry.DataEntry;
import com.anychart.chart.common.dataentry.ValueDataEntry;
import com.anychart.charts.Pie;
import com.anychart.enums.Anchor;
import com.anychart.enums.Position;

import java.util.ArrayList;
import java.util.List;

public class StudentStatisticsParbaj extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_statistics_parbaj);

        Button atlagstat;
        atlagstat = findViewById(R.id.atlagstat);
        atlagstat.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });

        AnyChartView anyChartView = findViewById(R.id.any_chart_view);
        Pie pie = AnyChart.pie();
        pie.selected().outline().fill("#3BD340");
        pie.selected().fill("#3BD340");
        List<DataEntry> data = new ArrayList<>();
        data.add(new ValueDataEntry("Vereség", 3));
        data.add(new ValueDataEntry("Győzelem", 8));
        pie.data(data);

        anyChartView.setChart(pie);
    }
}
