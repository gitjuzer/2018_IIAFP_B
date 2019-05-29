package hu.afp.oktatoapp;

import android.support.test.rule.ActivityTestRule;
import android.view.View;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import static org.junit.Assert.*;

public class StudentStatisticsTargyakTest {
    @Rule

    public ActivityTestRule<StudentStatisticsTargyak> studentStatisticsTargyakActivityTestRule = new ActivityTestRule<>(StudentStatisticsTargyak.class);

    private StudentStatisticsTargyak studentStatisticsTargyakActivity = null;

    @Before
    public void setUp() throws Exception {
        studentStatisticsTargyakActivity = studentStatisticsTargyakActivityTestRule.getActivity();
    }

    @Test
    public void testMainActivityLaunch(){

        View view = studentStatisticsTargyakActivity.findViewById(R.id.parbajstat);
        assertNotNull(view);
    }
    @After //cleanup
    public void tearDown() throws Exception {
        studentStatisticsTargyakActivity = null;
    }
}