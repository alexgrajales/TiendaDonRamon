import { environment } from "environments/environment";


export function GLOBALURLS(){    
    let ListaUrls;
    ListaUrls = {
        urlUsuarios : environment.api + '/api/createusers/',                         
        urlUsuario  : environment.api + '/api/usuario/',                         
    }    
    return ListaUrls;
}