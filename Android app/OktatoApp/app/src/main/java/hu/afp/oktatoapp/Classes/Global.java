package hu.afp.oktatoapp.Classes;

import android.content.Context;
import android.net.ConnectivityManager;

import java.util.Objects;

public class Global {
    public static boolean isNetworkConnected(Context ctx){
        ConnectivityManager cm = (ConnectivityManager)ctx.getSystemService(Context.CONNECTIVITY_SERVICE);
        return Objects.requireNonNull(cm).getActiveNetworkInfo() != null;
    }
}
