import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript';

@Injectable()
export class ApiService {
    client : ApiAiClient;
    
    constructor() { 
        this.client = new ApiAiClient({accessToken: '63d52975847c4b10bbaa78bb6978f6cb'});
    }
    
    ask(question:string) : Promise<any>{
        return this.client.textRequest(question)
            .then(this.handleResponse)
            .catch(this.handleError);
    }
    
     handleResponse(serverResponse): any{
//        console.log(serverResponse);
        return serverResponse

    }
    
     handleError(serverError): any {
//        console.log(serverError)
        return serverError.toString()
    }
    
}
