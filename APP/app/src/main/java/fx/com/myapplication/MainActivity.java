package fx.com.myapplication;

import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    //    public static final String INDEX_PAGE = "http://www.zzsw.gov.cn:8088/index.htm";
    public static final String INDEX_PAGE = "http://111.1.31.149/fx/index.htm";
    //    Button right;
    Button left;
    Button right;
    WebView wView;
    TextView titleBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        titleBar = (TextView) findViewById(R.id.title_name);
        wView = (WebView) findViewById(R.id.webView);
        WebSettings wSet = wView.getSettings();
        wSet.setJavaScriptEnabled(true);
        wView.setWebChromeClient(new WebChromeClient());
        wView.setWebViewClient(new WebViewClient() {
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                changeTitle(url);
                wView.loadUrl(url);
                return true;
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                changeTitle(url);
                super.onPageStarted(view, url, favicon);

            }

            @Override
            public void onLoadResource(WebView view, String url) {
                if(url.endsWith("htm"))
                    changeTitle(url);
                super.onLoadResource(view, url);
            }
        });
        wView.setBackgroundColor(0);

        this.loadIndex();

        this.left = ((Button) findViewById(R.id.gohome_btn));
        this.disableLeftButton();
        this.left.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                loadIndex();
            }
        });

        this.right = ((Button) findViewById(R.id.right_btn));
        this.right.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                refresh();
            }


        });

    }

    private void changeTitle(String url) {
        String[] result = url.split("/");

        titleBar.setText(result[result.length-1]);
        if (url!=null && url.contains("index.htm")) {
            disableLeftButton();
        } else {
            enaLeftButton();
        }

    }

    private void enaLeftButton() {
        this.left.setVisibility(View.VISIBLE);
    }

    private void disableLeftButton() {
        this.left.setVisibility(View.INVISIBLE);
    }


    @Override
    public boolean onKeyDown(int keyCoder, KeyEvent event) {
        if (wView.canGoBack() && keyCoder == KeyEvent.KEYCODE_BACK) {
            wView.goBack();
            return true;
        }
        return false;
    }

    private void loadIndex() {
        wView.loadUrl(INDEX_PAGE);
    }

    private void refresh() {
        wView.reload();
    }

}
