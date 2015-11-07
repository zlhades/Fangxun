package fx.com.myapplication;

import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    //    public static final String INDEX_PAGE = "http://www.zzsw.gov.cn:8088/index.htm";
    public static final String INDEX_PAGE = "http://111.1.31.149/fx/index.htm";
    //    Button right;
    Button left;
    Button right;
    WebView wView;
    TextView titleBar;
    ProgressBar pb;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        pb = (ProgressBar) findViewById(R.id.pb);
        pb.setMax(100);

        titleBar = (TextView) findViewById(R.id.title_name);
        wView = (WebView) findViewById(R.id.webView);
        WebSettings wSet = wView.getSettings();
        wSet.setJavaScriptEnabled(true);
        wView.setWebChromeClient(new WebChromeClientCustom());
        wView.setWebViewClient(new WebViewClient() {
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                pb.setVisibility(View.VISIBLE);
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
//                if(url.endsWith("htm"))
//                    changeTitle(url);
                boolean isSet = false;
                if(url.contains(".aspx")) {
                    isSet = true;
                    pb.setVisibility(View.VISIBLE);
                }
                super.onLoadResource(view, url);
                if(isSet) {
                    pb.setVisibility(View.GONE);
                }
            }
        });
        wView.setBackgroundColor(0xFFADD8E6);

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

        setTitle(result[result.length - 1]);
        if (url!=null && url.contains("index.htm")) {
            disableLeftButton();
        } else {
            enaLeftButton();
        }

    }

    private final static Map<String, String> URL_TO_NAME = new HashMap<>();
    static {
        URL_TO_NAME.put("index.htm","株洲防汛");
        URL_TO_NAME.put("xq.htm","汛情摘要");
        URL_TO_NAME.put("ylxq.htm","雨情信息");
        URL_TO_NAME.put("sq.htm","水情信息");
        URL_TO_NAME.put("yjcx.htm","预警查询");
        URL_TO_NAME.put("gqsk.htm","工情信息");
        URL_TO_NAME.put("tq.htm","天气预报");
        URL_TO_NAME.put("zl.htm","防汛资料");
        URL_TO_NAME.put("tx.htm","防汛通讯录");
        URL_TO_NAME.put("sz.htm","系统设置");
    }

    private void setTitle(String text) {
        for (String url : URL_TO_NAME.keySet()) {
            if (text.contains(url)) {
                titleBar.setText(URL_TO_NAME.get(url));
            }
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

    private class WebChromeClientCustom extends WebChromeClient {
        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            pb.setProgress(newProgress);
            if(newProgress==100){
                pb.setVisibility(View.GONE);
            }
            super.onProgressChanged(view, newProgress);
        }

    }

}
