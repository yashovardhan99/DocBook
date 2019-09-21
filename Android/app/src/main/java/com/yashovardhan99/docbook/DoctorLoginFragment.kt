package com.yashovardhan99.docbook

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.navigation.Navigation
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.DocumentSnapshot
import com.google.firebase.firestore.FirebaseFirestore
import com.yashovardhan99.docbook.databinding.FragmentDoctorLoginBinding

/**
 * Created by Yashovardhan99 on 21/9/19 as a part of DocBook.
 */
class DoctorLoginFragment : Fragment() {
    private lateinit var mAuth: FirebaseAuth
    private lateinit var binding: FragmentDoctorLoginBinding
    private lateinit var db: FirebaseFirestore
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        mAuth = FirebaseAuth.getInstance()
    }
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
//        (activity as MainActivity).supportActionBar?.title = "Doctor Login"
        binding =
            DataBindingUtil.inflate(inflater, R.layout.fragment_doctor_login, container, false)
        binding.loginButton.setOnClickListener { login() }
        return binding.root
    }

    private fun login() {
        binding.emailInputlayout.error = null
        binding.passwordInputlayout.error = null
        val email = binding.emailEdittext.text.toString()
        val password = binding.passwordEdittext.text.toString()
        when {
            email.isBlank() -> binding.emailInputlayout.error = "Cannot be Blank"
            password.isBlank() -> binding.passwordInputlayout.error = "Cannot be Blank"
            else -> mAuth.signInWithEmailAndPassword(email, password).addOnCompleteListener {
                when {
                    it.isSuccessful -> {
                        Log.d("DOCTORLOGIN", "Logged In : ${it.result.toString()}")
                        checkLoggedInAsDoctor()
                    }
                    else -> Log.e("DOCTORLOGIN", "Not Logged In", it.exception)
                }
            }
        }
    }

    override fun onStart() {
        super.onStart()
        db = FirebaseFirestore.getInstance()
        val currentUser = mAuth.currentUser
        if (currentUser != null) {
            Log.d("DoctorsLogin", "Signed In")
            checkLoggedInAsDoctor()
        }
    }

    private fun checkLoggedInAsDoctor(): Task<DocumentSnapshot> {
        return db.collection("users").document(mAuth.currentUser?.uid.toString()).get()
            .addOnSuccessListener {
                if (!(it["isDoctor"] as Boolean)) {
                    Toast.makeText(
                        context,
                        "Please sign in with a doctor account",
                        Toast.LENGTH_LONG
                    ).show()
                    mAuth.signOut()
                } else {
                    Navigation.findNavController(activity as MainActivity, R.id.nav_host)
                        .navigate(R.id.action_doctorLoginFragment_to_doctorHomeFragment)
                }
            }
    }
}