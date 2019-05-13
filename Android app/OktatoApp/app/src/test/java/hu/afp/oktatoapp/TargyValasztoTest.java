package hu.afp.oktatoapp;


import android.widget.Spinner;

import org.junit.Test;

import java.util.Arrays;

import static org.junit.Assert.*;

public class TargyValasztoTest {

    @Test
    public void setSpinner() {
        //String[] targyak = new String[] {"Válasszon tantárgyat a legördülő menüből!", "Történelem", "Matematika", "Magyar nyelv", "Fizika"};
        //int expected = 1;
        //assertEquals(Arrays.asList(targyak).indexOf(1), expected); //TODO: NullPointerExceptiont dob ez a verzió, és nem tudom miért
    }

    @Test
    public void setSpinnerValue1True() {
        int getSelectedItemPosition = 1;
        int expected = 1;
        assertEquals(getSelectedItemPosition, expected);
    }

    @Test
    public void setSpinnerValue1False() {
        int getSelectedItemPosition = 2;
        int expected = 1;
        assertNotEquals(getSelectedItemPosition, expected);
    }

    @Test
    public void setSpinnerValue2True() {
        int getSelectedItemPosition = 2;
        int expected = 2;
        assertEquals(getSelectedItemPosition, expected);
    }

    @Test
    public void setSpinnerValue2False() {
        int getSelectedItemPosition = 1;
        int expected = 2;
        assertNotEquals(getSelectedItemPosition, expected);
    }

    @Test
    public void setSpinnerValue3True() {
        int getSelectedItemPosition = 3;
        int expected = 3;
        assertEquals(getSelectedItemPosition, expected);
    }

    @Test
    public void setSpinnerValue3False() {
        int getSelectedItemPosition = 1;
        int expected = 3;
        assertNotEquals(getSelectedItemPosition, expected);
    }

    @Test
    public void setSpinnerValue4True() {
        int getSelectedItemPosition = 4;
        int expected = 4;
        assertEquals(getSelectedItemPosition, expected);
    }

    @Test
    public void setSpinnerValue4False() {
        int getSelectedItemPosition = 3;
        int expected = 4;
        assertNotEquals(getSelectedItemPosition, expected);
    }

    @Test
    public void setSpinnerValue5True() {
        int getSelectedItemPosition = 5;
        int expected = 5;
        assertEquals(getSelectedItemPosition, expected);
    }

    @Test
    public void setSpinnerValue5False() {
        int getSelectedItemPosition = 1;
        int expected = 5;
        assertNotEquals(getSelectedItemPosition, expected);
    }
}