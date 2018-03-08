package com.as_my_deadline_says.mobile

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.TextView
import com.as_my_deadline_says.mobile.model.Product

/**
 * Created by svyatoslav on 09.03.18.
 */
class ProductAdapter(ctx : Context, list: ArrayList<Product>) :
        ArrayAdapter<Product>(ctx, android.R.layout.simple_expandable_list_item_1, list) {

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        val product = getItem(position)
        var newConvertView = convertView
        if (newConvertView == null) {
            newConvertView = LayoutInflater.from(getContext())
                    .inflate(android.R.layout.simple_list_item_1, null)
        }
        newConvertView!!.findViewById<TextView>(android.R.id.text1).text = product.value
        return newConvertView
    }
}