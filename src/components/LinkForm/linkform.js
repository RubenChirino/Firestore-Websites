import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from 'formik';
import { db } from "../../firebase";
import { toast } from "react-toastify";

export default function LinkForm({ addOrEditLink, currentId }){

    const initialValues = {
        url: '',
        name: '',
        description: ''
    }

    const [values, setValues] = useState(initialValues);

    const validURL = (str) => {
        var pattern = new RegExp(
          "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
          "i"
        ); // fragment locator
        return !!pattern.test(str);
      };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (/*values, { setFieldError }*/) => {       

        //Validations
        if(!values.url){
            return toast('Required url',{
                type: 'warning',
                autoClose: 1500
            })
        }else if(!validURL(values.url)){           
            return toast('Invalid url',{
                type: 'warning',
                autoClose: 1500
            })
        } 

        if(!values.name){
            return toast('Required name',{
                type: 'warning',
                autoClose: 1500
            })
        }

        if(!values.description){
            return toast('Required description',{
                type: 'warning',
                autoClose: 1500
            })
        }

        //Operations
        addOrEditLink(values);
        setValues(initialValues)
    }

    const getLinkById = async (id) => {
        const doc = await db.collection('links').doc(id).get();
        console.log(doc.data())
        setValues({...doc.data()})
    }

    useEffect(function(){
          if(currentId !== ''){
            getLinkById(currentId);
          }
    },[currentId])

    return(
        <Formik initialValues={values} onSubmit={handleSubmit}> 
            {
                ({ errors, isSubmitting }) => 
                
                <Form className="card card-body">
                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                        <i className="material-icons">insert_link</i>
                        </div>
                        <Field value={values.url} onChange={handleInputChange} className="form-control" placeholder="https://someurl.com" name="url" />                
                    </div>

                    <div className="form-group input-group">
                        <div className="input-group-text bg-light">
                        <i className="material-icons">create</i>
                        </div>
                        <Field value={values.name} onChange={handleInputChange} className="form-control" placeholder="website name" name="name" />
                    </div>

                    <div className="form-group">
                    <textarea value={values.description} onChange={handleInputChange} className="form-control" name="description" placeholder="Write a description" rows="3"></textarea> 
                    </div>

                    <button type="submit" className="btn btn-primary btn-block" > {/* disabled={isSubmitting} */}
                        {currentId === '' ? 'Save' : 'Update'}
                    </button>
                </Form>
            }
        </Formik>
    )

}
