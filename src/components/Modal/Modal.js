import React from 'react';
import ReactDom from 'react-dom';

import { clearModal } from '../../store/actions/modalActions';

import './Modal.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
        document.removeEventListener('mousedown', this.handleClick, false)
    }


    handleClick = e => {
        if (!this.modalNode.contains(e.target)) {
            this.props.dispatch(clearModal())
        }
    }

    render() {
        return ReactDom.createPortal(
            <div ref={modalNode => this.modalNode = modalNode}>
             {this.props.children}
           </div>,
            this.el);
    }
}

export default Modal;