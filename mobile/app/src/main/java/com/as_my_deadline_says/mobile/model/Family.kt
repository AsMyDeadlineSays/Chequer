package com.as_my_deadline_says.mobile.model

/**
 * Created by svyatoslav on 08.03.18.
 */

open class Product(val value : String, val price : Float?, val amount : String, val tag : Int?){

    override fun toString(): String {
        return "{value: $value, price: $price, amount: $amount, tag: $tag}"
    }
}
data class ToBuyProduct(val name : String) : Product(name, 0.0F, "", 0){
    override fun toString(): String {
        return name
    }
}

data class Family (val id : String, var toBuy : ArrayList<Product>, var history : ArrayList<Product>)