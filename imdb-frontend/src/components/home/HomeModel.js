import React, { Component } from 'react'; 
import { RhelenaPresentationModel } from 'rhelena';
import { userData } from '../../helper'
import Fuse from 'fuse.js'

export default class HomeModel extends RhelenaPresentationModel {
    constructor(props){
        super(props);

        this.showInputs = false;
        this.fetched = false;
        this.movies = [];
        this.moviesFull = [];
        this.fuse = null;
        this.search = '';

        this.fetchMovies();
    }

    fetchMovies(){
        fetch(`http://localhost:3001/graphql`, {
            method: 'POST',
            headers: new Headers({
              'Authorization': userData.token,
              'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                query: "{ filmesNota(nota: 8){ posicao,tituloFilme,ano,nota }}"
            })
        })
        .then(res => res.json())
        .then(res => {
            // console.log(JSON.stringify(res));
            if(res.data != undefined){
                this.movies = JSON.parse(JSON.stringify(res.data.filmesNota));
                this.moviesFull = JSON.parse(JSON.stringify(res.data.filmesNota));
                this.fetched = true;
                this.indexMovies();
            }else{
                this.fetched = false;
            }
        });
    }

    indexMovies(){
        let options = {
            shouldSort: true,
            tokenize: true,
            matchAllTokens: true,
            findAllMatches: true,
            threshold: 0.6,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
              "tituloFilme",
              "ano",
              "nota"
            ]
        };
        this.fuse = new Fuse(this.movies, options);
    }

    filterMovies(search){
        if(search.length > 1){
            let result = this.fuse.search(search);
            this.movies = JSON.parse(JSON.stringify(result));
        }else{
            this.movies = JSON.parse(JSON.stringify(this.moviesFull));
        }
    }

}