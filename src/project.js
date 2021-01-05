import { http } from './config'

export default {

    salvar:(project) =>{
        return http.post('projects/',project)
    }

}