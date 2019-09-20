package com.yashovardhan99.docbook

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import com.yashovardhan99.docbook.databinding.FragmentDoctorLoginBinding

/**
 * Created by Yashovardhan99 on 21/9/19 as a part of DocBook.
 */
class DoctorLoginFragment : Fragment() {
    private lateinit var binding: FragmentDoctorLoginBinding
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
//        (activity as MainActivity).supportActionBar?.title = "Doctor Login"
        binding =
            DataBindingUtil.inflate(inflater, R.layout.fragment_doctor_login, container, false)
        return binding.root
    }
}