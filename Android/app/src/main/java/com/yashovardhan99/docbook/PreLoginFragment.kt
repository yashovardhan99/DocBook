package com.yashovardhan99.docbook

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.navigation.Navigation
import com.google.firebase.auth.FirebaseAuth
import com.yashovardhan99.docbook.databinding.FragmentPreloginBinding

/**
 * Created by Yashovardhan99 on 21/9/19 as a part of DocBook.
 */
class PreLoginFragment : Fragment() {
    private lateinit var firebaseAuth: FirebaseAuth
    private lateinit var binding: FragmentPreloginBinding
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        firebaseAuth = FirebaseAuth.getInstance()
    }
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
//        (activity as MainActivity).supportActionBar?.title = "DocBook"
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_prelogin, container, false)
        with(Navigation.findNavController(activity as MainActivity, R.id.nav_host)) {
            binding.doctorSigninButton.setOnClickListener { navigate(R.id.action_preLoginFragment3_to_doctorLoginFragment3) }
            binding.patientSigninButton.setOnClickListener { navigate(R.id.action_preLoginFragment3_to_patientLoginFragment) }
        }
        return binding.root
    }

    override fun onStart() {
        super.onStart()
        val currentUser = firebaseAuth.currentUser
        if (currentUser != null) {
            Log.d("PreLogin", "Signed In")
//            TODO("Signed In - Navigate")
        }
    }

}