package hu.afp.oktatoapp;

import android.support.test.rule.ActivityTestRule;
import android.view.View;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import static org.junit.Assert.*;

public class StudentMenuTest {

    @Rule

    public ActivityTestRule<StudentMenu> studentMenuTestRule = new ActivityTestRule<>(StudentMenu.class);

    private StudentMenu studentMenu = null;

    @Before //preparation
    public void setUp() throws Exception {
        studentMenu = studentMenuTestRule.getActivity();
    }

    @Test
    public void testMainActivityLaunch(){

        View view = studentMenu.findViewById(R.id.usernameDisplay_TextView);
        //if it is able to find the edit text, the activity is launched, and that is what i am testing.

        assertNotNull(view);
    }
    @After //cleanup
    public void tearDown() throws Exception {
        studentMenu = null;
    }
}