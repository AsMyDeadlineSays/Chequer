package com.as_my_deadline_says.mobile

import android.os.Bundle
import android.support.design.widget.BottomNavigationView
import android.support.v7.app.AppCompatActivity
import android.view.View
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    private val mOnNavigationItemSelectedListener = BottomNavigationView.OnNavigationItemSelectedListener { item ->
        when (item.itemId) {
            R.id.navigation_home -> {
                input_to_buy.visibility = View.GONE
                message.setText(R.string.title_share)
                return@OnNavigationItemSelectedListener true
            }
            R.id.navigation_dashboard -> {
                input_to_buy.visibility = View.VISIBLE
                message.setText(R.string.title_to_buy)
                return@OnNavigationItemSelectedListener true
            }
            R.id.navigation_notifications -> {
                input_to_buy.visibility = View.GONE
                message.setText(R.string.title_scan)
                return@OnNavigationItemSelectedListener true
            }
        }
        false
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener)
        navigation.selectedItemId = R.id.navigation_dashboard
    }
}
