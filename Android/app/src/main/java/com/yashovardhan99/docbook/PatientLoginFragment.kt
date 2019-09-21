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
import com.yashovardhan99.docbook.databinding.FragmentPatientLoginBinding

/**
 * Created by Yashovardhan99 on 21/9/19 as a part of DocBook.
 */
class PatientLoginFragment : Fragment() {
    private lateinit var binding: FragmentPatientLoginBinding
    private lateinit var mAuth: FirebaseAuth
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
//        (activity as MainActivity).supportActionBar?.title = "Patient Login"
        binding =
            DataBindingUtil.inflate(inflater, R.layout.fragment_patient_login, container, false)
        binding.loginButton.setOnClickListener { login() }
        return binding.root
    }

    override fun onStart() {
        super.onStart()
        db = FirebaseFirestore.getInstance()
        val currentUser = mAuth.currentUser
        if (currentUser != null) {
            Log.d("PatientLogin", "Signed In")
            checkLoggedInAsPatient()
        }
    }

    private fun login() {
        binding.emailInputlayout.error = null
        binding.passwordInputlayout.error = null
        val email = binding.emailEdittext.text.toString()
        val password = binding.passwordEdittext.text.toString()
        when {
            email.isBlank() -> binding.emailInputlayout.error = "Cannot be Blank"
            password.isBlank() -> binding.passwordInputlayout.error = "Cannot be Blank"
            else -> mAuth.signInWithEmailAndPassword(
                email,
                password
            ).addOnCompleteListener { authTask ->
                when {
                    authTask.isSuccessful -> {
                        Log.d("PATIENTLOGIN", "Logged In : ${authTask.result.toString()}")
                        val userPatient =
                            checkLoggedInAsPatient()
                    }
                    else -> Log.e("PATIENTLOGIN", "Not Logged In", authTask.exception)
                }
            }
        }
    }

    private fun checkLoggedInAsPatient(): Task<DocumentSnapshot> {
        return db.collection("users").document(mAuth.currentUser?.uid.toString()).get()
            .addOnSuccessListener {
                if (it["isDoctor"] as Boolean) {
                    Toast.makeText(
                        context,
                        "Please sign in with a patient account",
                        Toast.LENGTH_LONG
                    ).show()
                    mAuth.signOut()
                } else {
                    Navigation.findNavController(activity as MainActivity, R.id.nav_host)
                        .navigate(R.id.action_patientLoginFragment_to_patientHomeFragment)
                }
            }
    }
}