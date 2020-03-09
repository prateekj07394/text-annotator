import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import './ModifyAnnotation.css';
import Modal from 'react-bootstrap/Modal'
import { saveJsonData } from '../../actions/index';
import swal from 'sweetalert';
import Form from 'react-bootstrap/Form'

class ModifyAnnotation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            labels: ["Amendments", " Arbitration/Court Propogation", " Assignment", "Change of Control", " Confidentiality", "Contractual Penalties", " Default Interest", " Governing Law", " Guarantees", " Indemnification", " License", "Non-Solicitation", " Parties", " Payment Interest", " Set-off", " Waivers", " Zero Tag"],
            showLabel: false,
            show: false,
            showPrevTextMouse: false,
            showTextMouse: false,
            showNextTextMouse: false,
            annotationDetails: this.props.annotationDetails,
            highlightedText: "",
            selectedBox: "",
            sendToPrev: false,
            sendToNext: false
        }
        this.prevTextRef = React.createRef();
        this.textRef = React.createRef();
        this.nextTextRef = React.createRef();
        this.annotationWrapperRef = React.createRef();
    }
    componentDidMount(){
          
    }
    componentWillMount() {
        const { annotationDetails } = this.props;
        console.log(annotationDetails === undefined, this.props.history);

        if (annotationDetails === undefined) {
            this.props.history.push('/');
        }
    }
    handleMouseUp(e, boxName) {

        if (window.getSelection().toString() !== '') {
            if (boxName === "prev_text") {
                const end = this.prevTextRef.current.selectionEnd;
                const innerText = this.prevTextRef.current.innerHTML;
                let len = innerText.length;
                if (len === end) {
                    //show button to move text to text
                    this.setState({
                        showPrevTextMouse: true,
                        selectedBox: "prev_text"
                    });
                }


            } else if (boxName === "text") {
                const start = this.textRef.current.selectionStart;
                const end = this.textRef.current.selectionEnd;
                const innerText = this.textRef.current.innerHTML;
                let len = innerText.length;

                if (start === 0 && end < len) {
                    //show button to move text to prev_text
                    this.setState({
                        showTextMouse: true,
                        selectedBox: "text",
                        sendToPrev: true,
                        sendToNext: false
                    });
                } else if (end === len) {
                    this.setState({
                        showTextMouse: true,
                        selectedBox: "text",
                        sendToPrev: false,
                        sendToNext: true
                    });
                    //show button to move text to next_text
                }
            } else if (boxName === "next_text") {
                const start = this.nextTextRef.current.selectionStart;
                if (start === 0) {

                    this.setState({
                        showNextTextMouse: true,
                        selectedBox: "next_text"
                    });
                }
            }
            this.setState({
                highlightedText: window.getSelection().toString()
            });
        }

    }
    hideAllMouses() {
        this.setState({
            showNextTextMouse: false,
            showTextMouse: false,
            showPrevTextMouse: false
        });
    }
    renderTextBoxes() {
        const { annotationDetails } = this.state;
        if (annotationDetails === undefined) {
            return <span></span>
        }

        return (
            <div>
                <p className="flex space-between">
                    <strong>
                        Highlight text to view more
                    </strong>
                    <strong>
                        Label : {annotationDetails.label?annotationDetails.label:'-'}
                    </strong>
                </p>
                <p>
                    <strong>
                        Id
                    </strong>
                </p>
                <pre >{annotationDetails.Id}</pre>
                <p>
                    <strong>
                        Previous Text <i data-toggle="tooltip" title="Make sure you select text till the end
                        to add text to 'text'
                        " className="ml-2 fas fa-question-circle"></i>
                    </strong>
                </p>
                <div className="relative">
                    <textarea onMouseDown={(e) => {
                        this.hideAllMouses()
                    }} ref={this.prevTextRef} readOnly value={annotationDetails.prev_text} onMouseUp={(e) => {
                        this.handleMouseUp(e, "prev_text")
                    }}></textarea>
                    <div>
                        <i onClick={(e) => {
                            this.showModal()
                        }} className={`${this.state.showPrevTextMouse ? 'absolute' : 'hidden'}   fas fa-mouse`}></i>
                    </div>
                </div>
                <p>
                    <strong>
                        Text<i data-toggle="tooltip" title="Make sure you select text till the end
                        to add text to 'next_text' or from the start to add text to 'prev_end'
                        " className="ml-2 fas fa-question-circle"></i>
                    </strong>
                </p>
                <div className="relative">
                    <textarea onMouseDown={(e) => {
                        this.hideAllMouses()
                    }} ref={this.textRef} readOnly value={annotationDetails.text} onMouseUp={(e) => {
                        this.handleMouseUp(e, "text")
                    }}></textarea>
                    <div>
                        <i onClick={(e) => {
                            this.showModal()
                        }} className={`${this.state.showTextMouse ? 'absolute' : 'hidden'}   fas fa-mouse`}></i>
                    </div>
                </div>
                <p>
                    <strong>
                        Next Text<i  data-toggle="tooltip" title="Make sure you select text from the start
                        to add text to 'text'
                        " className="ml-2 fas fa-question-circle"></i>
                    </strong>
                </p>
                <div className="relative">
                    <textarea onMouseDown={(e) => {
                        this.hideAllMouses()
                    }} ref={this.nextTextRef} value={annotationDetails.next_text} readOnly onMouseUp={(e) => {
                        this.handleMouseUp(e, "next_text")
                    }}></textarea>
                    <div>
                        <i onClick={(e) => {
                            this.showModal()
                        }} className={`${this.state.showNextTextMouse ? 'absolute' : 'hidden'}   fas fa-mouse`}></i>
                    </div>
                </div>
            </div>
        )

    }
    showModal() {
        this.setState({
            show: true
        });
    }
    showLabelModal() {
        this.setState({
            showLabel: true
        });
    }
    handleClose() {
        this.setState({
            show: false,
            showLabel: false,
            showPrevTextMouse: false,
            showTextMouse: false,
            showNextTextMouse: false,
            labelSelected:"",
            labelToShow:""
        });
    }
    renderLabelModalBody() {
        return (
            <Form>
                <Row>
                {this.state.labels.map((data, index) => {
                    return (
                        <Col xs={6}  key={index}>
                        <Form.Check
                        onChange={(e)=>{
                            this.setState({
                                labelSelected:data
                            });
                        }}
                            type='radio'
                            label={` ${data}`}
                        />
                        </Col>
                    )
                })}
                </Row>
            </Form>
        )
    }
    renderModalBody() {
        return (
            <div>
                {this.state.selectedBox === "prev_text" ? `
             Are you sure you want to move the text 
             "
                ${this.state.highlightedText}
             " from prev_text
             to text body?
            `: null}
                {this.state.selectedBox === "text" && this.state.sendToPrev ? `
              Are you sure you want to move the text 
              "
                 ${this.state.highlightedText}
              " from text
              to prev_text body?
            `: null}
                {this.state.selectedBox === "text" && this.state.sendToNext ? `
              Are you sure you want to move the text 
              "
                 ${this.state.highlightedText}
              "  from text
              to next_text body?
            `: null}
                {this.state.selectedBox === "next_text" ? `
              Are you sure you want to move the text 
              "
                 ${this.state.highlightedText}
              "  from next_text
              to text body?
            `: null}
            </div>
        )
    }
    handleSaveLabel(){
        if(this.state.labelSelected){
           
            let annotation = { ...this.state.annotationDetails };
            annotation.label = this.state.labelSelected;
            let jsonData = [...this.props.jsonData];
            let currentId = annotation.index;
            jsonData[currentId] = annotation;
            this.props.saveJsonData(jsonData);
            this.setState({
                showLabel:false,
                labelToShow:this.state.labelSelected,
                annotationDetails:annotation
            },()=>{
                
            swal('Your selection has been saved');
            });
        }else{
            swal('Please select a label');
        }
    }
    handleSave() {
        const { highlightedText, showNextTextMouse, showTextMouse, showPrevTextMouse
            , sendToNext, sendToPrev } = this.state;
        let annotation = { ...this.state.annotationDetails };
        if (showPrevTextMouse) {
            annotation.prev_text = annotation.prev_text.replace(highlightedText, '');
            annotation.text = highlightedText.concat(annotation.text);
        } else if (showNextTextMouse) {
            annotation.next_text = annotation.next_text.replace(highlightedText, '');
            annotation.text = annotation.text.concat(highlightedText);
        } else if (showTextMouse) {
            if (sendToNext) {
                annotation.next_text = annotation.next_text.concat(highlightedText);
                annotation.text = annotation.text.replace(highlightedText, '');
            } else if (sendToPrev) {
                annotation.prev_text = highlightedText.concat(annotation.prev_text);
                annotation.text = annotation.text.replace(highlightedText, '');
            }
        }


        this.setState({
            show: false,
            annotationDetails: annotation
        }, () => {
            let jsonData = [...this.props.jsonData];
            let currentId = annotation.index;
            jsonData[currentId] = annotation;
            this.props.saveJsonData(jsonData);
            swal('Your changes have been saved');
        });

    }
    render() {
        return (
            <main className="p-5">
                <Modal show={this.state.show} onHide={(e) => {
                    this.handleClose();
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title><i className="fas fa-edit"></i>Modify text</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.renderModalBody()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => {
                            this.handleClose();
                        }}>
                            Close
          </Button>
                        <Button variant="primary" onClick={(e) => {
                            this.handleSave();
                        }}>
                            Save Changes
          </Button>
                    </Modal.Footer>
                </Modal>
                <Modal  show={this.state.showLabel} onHide={(e) => {
                    this.handleClose();
                }}>
                    <Modal.Header closeButton>
                        <Modal.Title><i className="fas fa-edit"></i>Assign Label</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.renderLabelModalBody()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={(e) => {
                            this.handleClose();
                            
                        }}>
                            Close
          </Button>
                        <Button variant="primary" onClick={(e) => {
                            this.handleSaveLabel();
                           
                        }}>
                            Save selection
          </Button>
                    </Modal.Footer>
                </Modal>
                <Container>
                    <Row>
                        <Col className="flex space-between">
                            <h3><i className="fas fa-edit"></i>Modify - Text</h3>
                            <Button variant="light" onClick={(e) => {
                                this.setState({ showLabel: true });
                            }}><i className="fas fa-save"></i>Assign Label</Button>{' '}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="annotation-area">
                            <div onMouseDown={(e) => {
                                // this.hideAllMouses()
                            }} ref={this.annotationWrapperRef} className="annotation-details">
                                {this.renderTextBoxes()}
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        );
    }
}

function mapStateToProps(state) {

    return {
        annotationDetails: state.annotationSelecter.selectedAnnotationDetails,
        jsonData: state.annotationSelecter.jsonData
    }
}
const mapDispatchToProps = {
    saveJsonData
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyAnnotation);