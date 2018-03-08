package com.as_my_deadline_says.mobile

import android.support.v4.app.FragmentManager
import android.content.Context
import android.content.SharedPreferences
import android.os.Bundle
import android.support.design.widget.BottomNavigationView
import android.support.v7.app.AppCompatActivity
import android.util.Log
import android.view.View
import android.widget.*
import com.android.volley.Request
import com.android.volley.RequestQueue
import com.android.volley.Response
import com.android.volley.VolleyError
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
import com.as_my_deadline_says.mobile.model.Family
import com.as_my_deadline_says.mobile.model.Product
import com.as_my_deadline_says.mobile.model.ToBuyProduct
import kotlinx.android.synthetic.main.activity_main.*
import org.json.JSONArray
import org.json.JSONObject

class MainActivity : AppCompatActivity(), ToBuyFragment.ToBuyDialogListener {

    private val URL = "https://pb.v-trof.ru"
    private lateinit var listViewAdapter : ProductAdapter
    private lateinit var sharedPreferencesId : SharedPreferences
    private lateinit var sharedPreferencesHistory : SharedPreferences
    private lateinit var sharedPreferencesToBuy : SharedPreferences
    private lateinit var family : Family

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
        val currentId = sharedPreferencesId.getString(getString(R.string.shared_preferences_id), getString(R.string.default_id))
        if(currentId == getString(R.string.default_id) || currentId == ""){
            createNewFamilyRequest()
        } else {
            getToBuyByIdRequest(currentId)
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

    override fun onFinishEditDialog(inputText: String?) {
        if (inputText != null) {
            family.toBuy.add(ToBuyProduct(inputText)) //unsafe, family might not be init
            listViewAdapter.notifyDataSetChanged()
        }
    }

    override fun onStop() {
        super.onStop()
        exportToBuyRequest()
    }

    private fun exportToBuyRequest(){
        val jsonObject = JSONObject()
        jsonObject.put("family", family.id)
        jsonObject.put("list", JSONArray())
        repeat(listViewAdapter.count, {i ->
            (jsonObject["list"] as JSONArray).put(productToJson(listViewAdapter.getItem(i)))
        })
        Log.d("debug", "HEY $jsonObject")
        val requestQueue = Volley.newRequestQueue(this)
        val request = JsonObjectRequest(Request.Method.POST,
                "$URL/api/to-buy/",
                jsonObject,
                { _: JSONObject? ->
                    Log.d("debug", "ToBuy was loaded")
                },
                {error: VolleyError? ->
                    error?.printStackTrace()
                })
        requestQueue.add(request)
    }

    private fun stringToProductToJson(string: String) : JSONObject {
        val json = JSONObject()
        json.put("value", string)
        json.put("price", 0)
        json.put("amount", "")
        json.put("tag", 0)
        return json
    }

    private fun productToJson(product: Product) : JSONObject {
        return stringToProductToJson(product.value)
    }

    private fun jsonToProduct(jsonObject: JSONObject) : Product {
        return Product(jsonObject["value"] as String,
                null,
                jsonObject["amount"] as String,
                null)
    }

    private fun getToBuyByIdRequest(id : String) {
        val requestQueue = Volley.newRequestQueue(this)
        val request = JsonArrayRequest(Request.Method.GET,
                "$URL/api/to-buy/$id",
                null,
                {response ->
                    Log.d("debug", id)
                    Log.d("debug", response.toString())
                    family = Family(id, ArrayList(), ArrayList())
                    repeat(response.length(), {i -> family.toBuy.add(jsonToProduct(response[i] as JSONObject))})
                    listViewAdapter = ProductAdapter(this, family.toBuy)
                    to_buy_list.adapter = listViewAdapter
                    to_buy_list.onItemClickListener =
                            AdapterView.OnItemClickListener{adapterView, view, position, id ->
                                family.toBuy.remove(listViewAdapter.getItem(position))
                                listViewAdapter.notifyDataSetChanged()
                            }
                },
                {error: VolleyError? ->
                    error?.printStackTrace()
                })
        requestQueue.add(request)
    }

    private fun createNewFamilyRequest(){
        val requestQueue : RequestQueue = Volley.newRequestQueue(this)
        val request = JsonObjectRequest(Request.Method.PUT, "$URL/api/family/", null, Response.Listener<JSONObject> {
            val id = it["id"] as String
            family = Family(id, ArrayList(), ArrayList())
            sharedPreferencesId.edit().putString(getString(R.string.shared_preferences_id), id).apply()
        }, Response.ErrorListener {
            it.printStackTrace()
        })
        requestQueue.add(request)
    }
}
