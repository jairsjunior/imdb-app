import { RhelenaPresentationModel, globalState } from "rhelena";
import { setUserData, userData } from '../../helper'

export default class LoginModel extends RhelenaPresentationModel {
    constructor() {
        super();

        this.username = '';
        this.password = '';
        this._token = null;
    }

    doLogin() {
        fetch(`http://localhost:3001/login`, {
            method: 'POST',
            headers: new Headers({
              'Authorization': this.make_base_auth(this.username, this.password)
            }),
            body: JSON.stringify({
                name: this.username.toLowerCase(),
                password: this.password
            })
        })
        .then(res => res.json())
        .then(res => {
            console.log(JSON.stringify(res));
            if(res.token != undefined){
                setUserData(res);
                this._token = res.token;
                window.location.reload();
            }else{
                setUserData(null);
            }
        });
    }

    make_base_auth(user, password) {
        var tok = user + ':' + password;
        var hash = new Buffer(tok).toString('base64');
        return "Basic " + hash;
    }
}





