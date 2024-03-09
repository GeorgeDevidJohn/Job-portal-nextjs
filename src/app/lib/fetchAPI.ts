// fetchAPI.ts
import {cookies} from "next/headers";

const fetchAPI = async (url: string, options: RequestInit = {}): Promise<any> => {
    /*const devMode = process.env.NEXT_PUBLIC_DEV_MODE;
    if(devMode) {
        // Not in use - As we are using cookie now
        // Retrieve the token from localStorage
        const token = localStorage.getItem('jwtoken');

        // Add the Authorization header to the request
        options.headers = {
            ...options.headers,
            'Authorization': token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        };
    }*/
    const apiURL = process.env.NEXT_PUBLIC_API_SERVER+url;
    console.log("----- Fetching API ------>\nURL: "+apiURL+"\nCache:"+options.cache);
    options.headers = {
        ...options.headers,
        Cookie: cookies().toString()
    };
    const response = await fetch(apiURL, {...options, credentials: 'include'});


    const jsonResponse  = (await response.json());

    if (!response.ok) {
        console.log("----- ERROR API ------>\nURL: "+apiURL+"\nError"+jsonResponse.message);
        if(jsonResponse.message=="Unauthorized"){
            //Remove token and role cookies here
            // logout();
        }
        //throw new Error('Network response was not ok');
    }
    console.log("----- Response API ------>\nURL: "+apiURL+"\nResponse:"+JSON.stringify(jsonResponse));
    return jsonResponse;
};

export default fetchAPI;