import React, {Component} from 'react'
import { attachModelToView } from 'rhelena';
import NavBarModel from './NavBarModel';
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavDropdown from 'react-bootstrap/lib/NavDropdown'
import MenuItem from 'react-bootstrap/lib/MenuItem'


export default class NavBarPrincipal extends Component {

    componentWillMount(){
        attachModelToView(new NavBarModel(), this);
    }

    render() {
        return (
            <Navbar style={{ backgroundColor: 'white'}}>
            <Navbar.Header>
                <Navbar.Brand style={{ padding: '0px' }}>
                    <span style={{ display: 'inline' }}>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" alt="Logo"
                            style={{ 
                                height: '100%',
                                lineHeight: '50px',
                                objectFit: 'contain'
                        }}>
                        </img>
                    </span>
                    <span style={{ paddingLeft: '10px', color: 'black'}}>IMDB Top 250 Movies</span>
                </Navbar.Brand>
            </Navbar.Header>
                <Nav pullRight>
                    <NavDropdown eventKey={3} title="Propriedades" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1} onClick={() => this.viewModel.logout()}>Sair</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>
        )        
    }
}
