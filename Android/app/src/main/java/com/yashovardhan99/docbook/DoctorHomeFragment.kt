package com.yashovardhan99.docbook

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.databinding.DataBindingUtil
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.DocumentChange
import com.google.firebase.firestore.FirebaseFirestore
import com.yashovardhan99.docbook.databinding.FragmentDoctorHomeBinding

/**
 * Created by Yashovardhan99 on 21/9/19 as a part of DocBook.
 */
class DoctorHomeFragment : Fragment() {
    private lateinit var binding: FragmentDoctorHomeBinding
    private lateinit var mAuth: FirebaseAuth
    private lateinit var db: FirebaseFirestore
    private val patientList = ArrayList<Patient>()
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = DataBindingUtil.inflate(inflater, R.layout.fragment_doctor_home, container, false)
        return binding.root
    }

    override fun onStart() {
        super.onStart()
        mAuth = FirebaseAuth.getInstance()
        db = FirebaseFirestore.getInstance()
        val adapter = DoctorHomeListAdapter(patientList)
        binding.doctorHomerecycler.adapter = adapter
        binding.doctorHomerecycler.layoutManager =
            LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)

        db.collection("users")
            .document(mAuth.uid.toString())
            .collection("patients")
            .addSnapshotListener { querySnapshot, firebaseFirestoreException ->
                if (firebaseFirestoreException != null)
                    Log.e("DoctorHome", "Error", firebaseFirestoreException)
                for (documentChange in querySnapshot?.documentChanges!!) {
                    when (documentChange.type) {
                        DocumentChange.Type.ADDED -> {
                            patientList.add(
                                Patient(
                                    documentChange.document.id,
                                    documentChange.document["name"] as String
                                )
                            )
                            adapter.notifyItemInserted(patientList.lastIndex)
                        }
                        DocumentChange.Type.REMOVED -> {
                            adapter.notifyItemRemoved(patientList.indexOfFirst { it.uid == documentChange.document.id })
                            patientList.removeAll { it.uid == documentChange.document.id }
                        }
                        DocumentChange.Type.MODIFIED -> adapter.notifyDataSetChanged()
                    }
                }
            }
    }
}