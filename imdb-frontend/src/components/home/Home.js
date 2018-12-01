import React, {Component} from 'react'
import { Grid, Row, Col} from 'react-flexbox-grid';
import { attachModelToView } from 'rhelena';
import HomeModel from './HomeModel'
import NavBar from '../nav-bar/Navbar'
import Panel from 'react-bootstrap/lib/Panel'


export default class Home extends Component {

    componentWillMount(){
        attachModelToView(new HomeModel(this.props), this);
    }

    renderMovie(movie){
        return (
            <Col xs={12} md={12}>
                <Panel>
                    <Panel.Body>
                        <span>Posição: {movie.posicao} </span><br></br>
                        <span>Filme: {movie.tituloFilme} </span><br></br>
                        <span>Ano: {movie.ano} </span><br></br>
                        <span>Nota: {movie.nota} </span>
                    </Panel.Body>
                </Panel>
            </Col>
        )
    }

    render(){
        return (
            <div>
                <NavBar></NavBar>
                <Grid fluid style={{ minWidth: '100%' }}>
                    <Row>
                        <Col xs={12} md={12}>
                            <Row>
                                <input placeholder="Pesquise aqui" type="text" onChange={(e) => this.viewModel.filterMovies(e.target.value)} />
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={12}>
                            <Row>
                                { this.state.fetched &&     
                                    this.state.movies.map((movie) => {
                                        return this.renderMovie(movie);
                                    })}
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
}