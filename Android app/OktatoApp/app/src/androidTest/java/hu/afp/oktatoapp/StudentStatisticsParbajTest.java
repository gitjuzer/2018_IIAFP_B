package hu.afp.oktatoapp;

import android.support.test.rule.ActivityTestRule;
import android.view.View;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import static org.junit.Assert.*;

public class StudentStatisticsParbajTest {
    @Rule

    public ActivityTestRule<StudentStatisticsParbaj> studentStatisticsParbajActivityTestRule = new ActivityTestRule<>(StudentStatisticsParbaj.class);

    private StudentStatisticsParbaj studentStatisticsParbajActivity = null;

    @Before
    public void setUp() throws Exception {
        studentStatisticsParbajActivity = studentStatisticsParbajActivityTestRule.getActivity();
    }

    @Test
    public void testMainActivityLaunch(){

        View view = studentStatisticsParbajActivity.findViewById(R.id.atlagstat);
        assertNotNull(view);
    }
    @After //cleanup
    public void tearDown() throws Exception {
        studentStatisticsParbajActivity = null;
    }
}