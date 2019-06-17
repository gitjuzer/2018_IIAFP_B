package hu.afp.oktatoapp;

import android.support.test.rule.ActivityTestRule;
import android.view.View;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import static org.junit.Assert.*;

public class MainActivityTest {

    @Rule

    public ActivityTestRule<MainActivity> mActivityActivityTestRule = new ActivityTestRule<>(MainActivity.class);

    private MainActivity mainActivity = null;

    @Before //preparation
    public void setUp() throws Exception {
        mainActivity = mActivityActivityTestRule.getActivity();
    }

    @Test
    public void testMainActivityLaunch(){

        View view = mainActivity.findViewById(R.id.teacherID);
        //if it is able to find the edit text, the activity is launched, and that is what i am testing.

        assertNotNull(view);
    }
    @After //cleanup
    public void tearDown() throws Exception {
        mainActivity = null;
    }


    //Role Type tests

    /*
    @Test
    public void RoleTypeTestWithInvalidData() throws Exception{
        setUp();
        assertNotNull(mainActivity.CreateNewUser("Username","password","ExampleRole"));
    }*/

    @Test
    public void RoleTypeTest() throws Exception{
        setUp();
        assertNotNull(mainActivity.CreateNewUser("Username","password","STUDENT"));
    }


}