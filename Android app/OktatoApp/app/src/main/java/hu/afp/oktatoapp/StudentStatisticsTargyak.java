package hu.afp.oktatoapp;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import com.anychart.AnyChart;
import com.anychart.AnyChartView;
import com.anychart.chart.common.dataentry.DataEntry;
import com.anychart.chart.common.dataentry.ValueDataEntry;
import com.anychart.charts.Cartesian;
import com.anychart.core.cartesian.series.Column;
import com.anychart.enums.Anchor;
import com.anychart.enums.HoverMode;
import com.anychart.enums.Position;
import com.anychart.enums.TooltipPositionMode;

import java.util.ArrayList;
import java.util.List;

public class StudentStatisticsTargyak extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_student_statistics_targyak);

        Button parbajstat;
        parbajstat = findViewById(R.id.parbajstat);
        parbajstat.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent parbajstatisztika = new Intent(StudentStatisticsTargyak.this, StudentStatisticsParbaj.class);
                startActivity(parbajstatisztika);
            }
        });

        AnyChartView anyChartView = findViewById(R.id.any_chart_view);
        Cartesian cartesian = AnyChart.column();

        List<DataEntry> data = new ArrayList<>();
        data.add(new ValueDataEntry("Bevinfo", 5));
        data.add(new ValueDataEntry("Webprog", 2.463));
        data.add(new ValueDataEntry("DBMS", 4.765));
        data.add(new ValueDataEntry("Logika", 3.5));
        data.add(new ValueDataEntry("Kalkulus", 2.2));

        Column column = cartesian.column(data);
        column.tooltip()
                .titleFormat("{%X}")
                .position(Position.CENTER_BOTTOM)
                .anchor(Anchor.CENTER_BOTTOM)
                .offsetX(0d)
                .offsetY(5d)
                .format("{%Value}{groupsSeparator: }");

        cartesian.animation(true);
        column.normal().fill("#3BD340");
        column.selected().fill("#00CC99");

        cartesian.title("Átlagok tárgyak szerint");
        cartesian.yScale().maximum(5.0);
        cartesian.yAxis(0).labels().format("{%Value}{groupsSeparator: }");
        cartesian.interactivity().hoverMode(HoverMode.BY_X);
        cartesian.xAxis(0).title("Tárgyak");
        cartesian.yAxis(0).title("Jegyek");

        anyChartView.setChart(cartesian);
    }
}
