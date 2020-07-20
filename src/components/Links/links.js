import React, { useEffect, useState } from "react";
import LinkForm from "../LinkForm/linkform";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import Spinner from "../Spinner/index";

export default function Link(){

    const [link, setLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    //Update
    const [currentId, setCurrentId] = useState('');

    function getLinks(){
        setLoading(true)
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id})
            });
            setLinks(docs)
            setLoading(false)
       });    
    }

    async function addOrEditLink(linkObject){      
        try {
            if(currentId === ''){
                await db.collection('links').doc().set(linkObject);
                toast('New Link addad',{
                type: 'success'
                });
            }else{
                db.collection('links').doc(currentId).update(linkObject);
                toast('Link update successfully',{
                    type: 'info'    
                });
                setCurrentId('');
            }
        }catch (error) {
            console.error(error);
        }
    }

    async function onDeleteLink(id){
       if(window.confirm('are you sure you that want to delete this message?')){
           await db.collection('links').doc(id).delete();
           toast('Link removed successfully',{
            type: 'error',
            autoClose: 2000
        })
       }
    }

    const Content = () => {

		if (loading) {
            return <Spinner />;
		}

		return link.map(link => (
            <div key={link.id} className="card mb-1">
                <div className="card-body">
                
                <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                    <i onClick={() => onDeleteLink(link.id)} className="material-icons text-danger px-1">close</i>
                    <i onClick={() => setCurrentId(link.id)} className="material-icons px-1">create</i>
                </div>
                </div>

                <p>{link.description}</p>
                <a href={link.url} target="_blank" rel="noopener noreferrer">Go to website!</a>
                </div>
            </div>
        ));
	};

    useEffect(function(){  
        getLinks();  
    },[])

    return(
        <>
            <div className="col-md-4 p-2">
            <LinkForm addOrEditLink={addOrEditLink} currentId={currentId} />
            </div>
            <div className="col-md-8 p-2">
                {Content()}
            </div>
        </>
    )

}