package hu.afp.oktatoapp;

import android.support.test.rule.ActivityTestRule;
import android.view.View;

import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import static org.junit.Assert.*;

public class TargyValasztoTest {

    @Rule

    public ActivityTestRule<TargyValaszto> targyValasztoActivityTestRule = new ActivityTestRule<>(TargyValaszto.class);

    private TargyValaszto targyValasztoActivity = null;

    @Before
    public void setUp() throws Exception {
        targyValasztoActivity= targyValasztoActivityTestRule.getActivity();
    }

    @Test
    public void testMainActivityLaunch(){

        View view = targyValasztoActivity.findViewById(R.id.spinner);
        assertNotNull(view);
    }
    @After //cleanup
    public void tearDown() throws Exception {
        targyValasztoActivity = null;
    }
}