import Modal from 'react-modal';
import { Img, ListItem } from './ImageGalleryItem.styled';
import { Component } from 'react';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


Modal.setAppElement('#root');

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  }
openModal=() => {
    this.setState({isModalOpen: true})
  }
  closeModal=() => {
    this.setState({isModalOpen: false})
  }
  render() {
    const {
      onPicture: {previewURL, tags, largeImageURL}
    } = this.props
    return <ListItem >
      <Img onClick={this.openModal} src={previewURL} alt={tags} />
      
      <Modal
        isOpen={this.state.isModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={this.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Img src={largeImageURL} alt={tags}/>
              </Modal>
    </ListItem>
  }
}
