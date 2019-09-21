package com.yashovardhan99.docbook

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

/**
 * Created by Yashovardhan99 on 21/9/19 as a part of DocBook.
 */
class DoctorHomeListAdapter(private val patientList: ArrayList<Patient>) :
    RecyclerView.Adapter<DoctorHomeListAdapter.ViewHolder>() {
    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return ViewHolder(inflater.inflate(R.layout.doctorhome_recycleritem, parent, false))
    }

    override fun getItemCount(): Int {
        return patientList.size
    }

    override fun onBindViewHolder(holder: ViewHolder, position: Int) {
        holder.bind(patientList[position])
    }

    public class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        fun bind(patient: Patient) {
            itemView.findViewById<TextView>(R.id.patient_name).text = patient.name
            itemView.setOnClickListener {

            }
        }
    }
}