package com.as_my_deadline_says.mobile

import android.support.v4.app.FragmentManager
import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import android.support.design.widget.BottomNavigationView
import android.support.v7.app.AppCompatActivity
import android.view.View
import android.widget.AdapterView
import android.widget.ArrayAdapter
import android.widget.TextView
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), ToBuyFragment.ToBuyDialogListener {

    val URL = "localhost:3000"
    private val toBuyList : ArrayList<String> = ArrayList()
    private lateinit var listViewAdapter : ArrayAdapter<String>
    private lateinit var sharedPreferencesId : SharedPreferences
    private lateinit var sharedPreferencesHistory : SharedPreferences
    private lateinit var sharedPreferencesToBuy : SharedPreferences

    private val mOnNavigationItemSelectedListener = BottomNavigationView.OnNavigationItemSelectedListener { item ->
        when (item.itemId) {
            R.id.navigation_share -> {
                add_button.visibility = View.GONE
                to_buy_list.visibility = View.GONE
                return@OnNavigationItemSelectedListener true
            }
            R.id.navigation_to_buy -> {
                add_button.visibility = View.VISIBLE
                to_buy_list.visibility = View.VISIBLE
                return@OnNavigationItemSelectedListener true
            }
            R.id.navigation_scan -> {
                add_button.visibility = View.GONE
                to_buy_list.visibility = View.GONE
                return@OnNavigationItemSelectedListener true
            }
        }
        false
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        sharedPreferencesId = getSharedPreferences(getString(R.string.shared_preferences_id), Context.MODE_PRIVATE)
        sharedPreferencesHistory = getSharedPreferences(getString(R.string.shared_preferences_history), Context.MODE_PRIVATE)
        sharedPreferencesToBuy = getSharedPreferences(getString(R.string.shared_preferences_to_buy), Context.MODE_PRIVATE)
        if(sharedPreferencesId.getString(getString(R.string.shared_preferences_id),
                getString(R.string.default_id)) == getString(R.string.default_id)){
            createNewUser()
        } else {
            syncWithDb()
        }
        listViewAdapter= ArrayAdapter(this, android.R.layout.simple_expandable_list_item_1, toBuyList)
        to_buy_list.adapter = listViewAdapter
        to_buy_list.onItemClickListener =
                AdapterView.OnItemClickListener{adapterView, view, position, id ->
                    toBuyList.remove((view as TextView).text.toString())
                    listViewAdapter.notifyDataSetChanged()
        }
        add_button.setOnClickListener {
            showAddToBuyDialog()
        }
        navigation.setOnNavigationItemSelectedListener(mOnNavigationItemSelectedListener)
        navigation.selectedItemId = R.id.navigation_to_buy
    }

    private fun showAddToBuyDialog() {
        val fm : FragmentManager = supportFragmentManager
        val fragment = ToBuyFragment()
        fragment.show(fm, "fragment_add_to_buy")
    }

    private fun addToBuyList() {

    }

    private fun syncWithDb() {
        //throw RuntimeException("Не реализовано")
    }

    private fun createNewUser() {
        //throw RuntimeException("Не реализовано")
    }
    override fun onFinishEditDialog(inputText: String?) {
        if (inputText != null) {
            toBuyList.add(inputText)
            listViewAdapter.notifyDataSetChanged()
        }
    }
}
