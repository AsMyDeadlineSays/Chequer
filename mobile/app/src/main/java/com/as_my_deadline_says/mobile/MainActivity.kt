package com.as_my_deadline_says.mobile

import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import android.support.design.widget.BottomNavigationView
import android.support.v7.app.AppCompatActivity
import android.view.View
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    val URL = "localhost:3000"
    val sharedPreferencesId : SharedPreferences = getSharedPreferences(getString(R.string.shared_preferences_id), Context.MODE_PRIVATE)
    val sharedPreferencesHistory : SharedPreferences = getSharedPreferences(getString(R.string.shared_preferences_history), Context.MODE_PRIVATE)
    val sharedPreferencesToBuy : SharedPreferences = getSharedPreferences(getString(R.string.shared_preferences_to_buy), Context.MODE_PRIVATE)

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
        if(sharedPreferencesId.getString(getString(R.string.shared_preferences_id),
                getString(R.string.default_id)) == getString(R.string.default_id)){
            createNewUser()
        } else {
            syncWithDb()
        }
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener)
        navigation.selectedItemId = R.id.navigation_dashboard

    }

    private fun syncWithDb() {
        throw RuntimeException("Не реализовано")
    }

    private fun createNewUser() {
        throw RuntimeException("Не реализовано")
    }


}
