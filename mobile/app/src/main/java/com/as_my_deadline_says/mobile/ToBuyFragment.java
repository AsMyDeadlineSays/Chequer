package com.as_my_deadline_says.mobile;

import android.os.Bundle;
import android.support.v4.app.DialogFragment;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.WindowManager;
import android.view.inputmethod.EditorInfo;
import android.widget.EditText;
import android.widget.TextView;

/**
 * Created by svyatoslav on 07.03.18.
 */

public class ToBuyFragment extends DialogFragment implements TextView.OnEditorActionListener {

    public interface ToBuyDialogListener {
        void onFinishEditDialog(String inputText);
    }

    private EditText mEditText;

    public ToBuyFragment() {}

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.add_to_buy_fragment, container);
        mEditText = (EditText) view.findViewById(R.id.input_fragment);
        getDialog().setTitle("Hello");
        mEditText.requestFocus();
        try {
            getDialog().getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_VISIBLE);
        } catch (NullPointerException e){
            e.printStackTrace();
        }
        mEditText.setOnEditorActionListener(this);
        return view;
    }


    @Override
    public boolean onEditorAction(TextView textView, int i, KeyEvent keyEvent) {
        if(EditorInfo.IME_ACTION_DONE == i){
            ((MainActivity) getActivity()).onFinishEditDialog(mEditText.getText().toString());
            this.dismiss();
            return true;
        }
        return false;
    }

}
