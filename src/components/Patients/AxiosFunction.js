//import React from 'react';
import axios from 'axios'


// axios.defaults.headers.common["Authorization"] = `Token ${this.props.token}`;


async function AxiosFunction(method, path, obj_query, auth=true) {
    let token = JSON.parse(localStorage.getItem('v1_user_data'))
    let headers = { headers: {
        'Content-Type': 'multipart/form-data',
        "Authorization" : `Token ${token.token}`,
    }}
    let url = `http://127.0.0.1:8000/${path}`
    let data = {response:false, bknd_data:null, msg:`${method} Method Is Invalid`}




    if (auth){

  

        if (method === 'get'){

            await axios.get(url, headers).then(resp=>{
                data.response = true
                data.bknd_data = resp.data
                data.msg = "Axios Call Response"

                //alert("Axios Resp")
                
            })
            .catch(err=>{
                data.msg = "Axios Call Failed "+ method + err

                console.log(err)
                

                //alert("Failed....Resp")
            })
        }

        else if (method === 'post'){
            await axios.post(url, obj_query, headers).then(resp=>{
                data.response = true
                data.bknd_data = resp.data
                data.msg = "Axios Call Response"
            
            })
            .catch(err=>{
                
            })

        }

        else if (method === 'put'){
            await axios.put(url, obj_query, headers).then(resp=>{
                data.response = true
                data.bknd_data = resp.data
                data.msg = "Axios Call Response"
            })
            .catch(err=>{
                data.msg = "Axios Call Failed "+ method + err

                
            })

        }

        else if (method === 'patch'){
            await axios.patch(url, obj_query, headers).then(resp=>{
                data.response = true
                data.bknd_data = resp.data
                data.msg = "Axios Call Response"
            })
            .catch(err=>{
                data.msg = "Axios Call Failed "+ method + err

                
            })

        }

        else if (method === 'delete'){

            await axios.delete(url, headers).then(resp=>{
                data.response = true
                data.bknd_data = resp.data
                data.msg = "Axios Call Response"
            })
            .catch(err=>{
                data.msg = "Axios Call Failed "+ method + err

                
            })

        }
        
    }
    else{
        if (method === 'get'){

            await axios.get(url).then(resp=>{
                data.response = true
                data.bknd_data = resp.data
                data.msg = "Axios Call Response"
                //alert("No Auth Axios Resp")
            })
            .catch(err=>{
                data.msg = "Axios Call Failed "+ method + err
                //alert("No Auth Failed....Resp")
            })

        }
    }

    return data;
};

export default AxiosFunction;
