package hu.afp.oktatoapp.Classes;

import android.content.Context;
import android.util.Log;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import java.util.HashMap;
import java.util.Map;

public class MyToolbarCode {

    public static void Logout(Context ctx,String token){
        RequestQueue queue = Volley.newRequestQueue(ctx);
        String url = "https://oktatoappapi.herokuapp.com/OktatoAppAPI/users/logout";

        StringRequest postRequest = new StringRequest(Request.Method.POST, url,
                response -> {
                    // response
                    Log.d("Response", response);
                },
                error -> {
                    // error
                    Log.d("Error.Response", error.toString());
                }
        ) {
            @Override
            protected Map<String, String> getParams()
            {
                Map<String, String>  params = new HashMap<>();
                params.put("Authorization","Bearer "+token);
                return params;
            }
            @Override
            public String getBodyContentType() {
                return "application/json; charset=utf-8";
            }
        };
        queue.add(postRequest);
    }

}
