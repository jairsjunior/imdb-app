import React, { Component } from 'react'; 
import { RhelenaPresentationModel } from 'rhelena';
import { setUserData } from '../../helper'


export default class NavBarModel extends RhelenaPresentationModel {
    constructor(){
        super();
    }

    logout(){
        setUserData(null);
        window.location.reload();
    }

}