import { environment } from "environments/environment";


export function GLOBALURLS(){    
    let ListaUrls;
    ListaUrls = {
        urlUsuarios : environment.api + '/api/createusers/',                         
    }    
    return ListaUrls;
}