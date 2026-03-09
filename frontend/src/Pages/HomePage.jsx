import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NotesNotFound from '../components/NotesNotFound';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import axios from 'axios';
import toast from "react-hot-toast";

const HomePage = () => {
    const [isRatelimited, setIsRateLimited]= useState(false);
    const [notes, setNotes]= useState([])
    const [loading, setLoading]= useState(true)

    useEffect(()=>{
        const fetchNotes= async ()=>{
            try {
                const res= await axios.get("http://localhost:5001/api/notes")
                console.log(res.data)
                setNotes(res.data)
                setIsRateLimited(false)

            } catch (error) {
                console.log("Error fetching Notes")
                if(error.response?.status===429){
                    setIsRateLimited(true)
                }
                else{
                    toast.error("Failed to Load Notes")
                }
            }finally{
                setLoading(false)
            }
        }
        fetchNotes();
    },[]);
  return (
    <div className="min-h-screen">
       <Navbar />

       {isRatelimited && <RateLimitedUI /> }
       <div className="max-w-7xl mx-auto p-4 mt-6">
       {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
       {notes.length === 0 && !isRatelimited && <NotesNotFound />}

        {notes.length > 0 && !isRatelimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
       </div>
    </div>
  )
}

export default HomePage;
