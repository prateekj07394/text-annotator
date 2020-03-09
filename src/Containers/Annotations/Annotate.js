import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TableComponent from '../../components/TableComponent';
import {connect} from 'react-redux'
class Annotate extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (<main className="p-5">
            <Container>
                <Row>
                    <Col>
                        <h3><i className="fas fa-th-large"></i>Annotate -  All</h3>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TableComponent data={this.props.jsonData}/>
                    </Col>
                </Row>
            </Container>
        </main>);
    }
}

function mapStateToProps(state) {

    return {
        jsonData: state.annotationSelecter.jsonData
    }
}
export default connect (mapStateToProps,null)(Annotate);