import React from 'react';
import ReactDom from 'react-dom';

import { clearModal } from '../../store/actions/modalActions';

import './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.modalRoot = document.createElement('div');
  }

  componentWillMount() {
    this.modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(this.modalRoot);
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
    document.removeEventListener('mousedown', this.handleClick, false);
    document.body.removeChild(this.modalRoot);
  }

  handleClick = e => {
    if (!this.modalNode.contains(e.target)) {
      this.props.dispatch(clearModal());
    }
  };

  render() {
    return ReactDom.createPortal(
      <div ref={modalNode => (this.modalNode = modalNode)}>
        {this.props.children}
      </div>,
      this.el
    );
  }
}

export default Modal;
