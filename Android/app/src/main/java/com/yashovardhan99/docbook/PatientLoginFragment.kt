package com.yashovardhan99.docbook

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.yashovardhan99.docbook.databinding.FragmentPatientLoginBinding

/**
 * Created by Yashovardhan99 on 21/9/19 as a part of DocBook.
 */
class PatientLoginFragment : Fragment() {
    private lateinit var binding: FragmentPatientLoginBinding
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
//        (activity as MainActivity).supportActionBar?.title = "Patient Login"
        binding =
            DataBindingUtil.inflate(inflater, R.layout.fragment_patient_login, container, false)
        return binding.root
    }
}