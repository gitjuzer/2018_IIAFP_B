package hu.afp.oktatoapp;

import android.support.test.rule.ActivityTestRule;
import android.view.View;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import static org.junit.Assert.*;

public class RegistrationActivityTest {

    @Rule
    public ActivityTestRule<RegistrationActivity> registrationActivityActivityTestRule = new ActivityTestRule<>(RegistrationActivity.class);

    private RegistrationActivity registrationActivity = null;

    @Before
    public void setUp() throws Exception {
        registrationActivity = registrationActivityActivityTestRule.getActivity();
    }

    @Test
    public void testMainActivityLaunch(){

        View view = registrationActivity.findViewById(R.id.retryPassword_EditText);
        assertNotNull(view);
    }
    @After
    public void tearDown() throws Exception {
        registrationActivity = null;
    }

    //Email validation tests

    @Test
    public void isIncorrectEmailTest() throws Exception{
        setUp();
        assertFalse(registrationActivity.isCorrectEmail("somethink@freemail.hu"));
    }

    @Test
    public void isCorrectEmailTest() throws Exception{
        setUp();
        assertTrue(registrationActivity.isCorrectEmail("somethink@gmail.com"));
    }

    //PasswordHasherTest
    @Test
    public void isPasswordHasherWorked() throws Exception{
        setUp();
        assertFalse("PlainText".equals(registrationActivity.passwordHasher("PlainText")));
    }


}