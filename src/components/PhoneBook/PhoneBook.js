import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styles from './PhoneBook.module.css';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import Notification from '../Notification/Notification';
import UpBar from './slideBar.module.css';
import Fade from './titleFade.module.css';

class PhoneBook extends Component {
    state = {
        name: '',
        number: '',
        email: '',
        error: '',
    }

    handleSubmit = e => {
        e.preventDefault();

        const contact = {
            id: uuidv4(),
            name: this.state.name,
            email: this.state.email
        }
        this.props.onAddContact(contact);
    }

    handleChange = e => {
        this.setState({ name: e.target.value });
    }

    handleChangeEmail = e => {
        this.setState({ email: e.target.value });
    }

    render() {
        const contact = {
            id: uuidv4(),
            name: this.state.name,
            number: this.state.number
        }
        const { error } = this.props;

        return (
            <>
                <CSSTransition in appear timeout={500} classNames={UpBar} unmountOnExit>
                    <h2 className={styles.title}>Welcome to the club</h2>
                </CSSTransition>

                <CSSTransition in={error !== ''} timeout={250} classNames={Fade} unmountOnExit>
                    <Notification message={error}></Notification>
                </CSSTransition>

                <form className={styles.inputContact} onSubmit={this.handleSubmit}>
                    <label className={styles.label}>Name</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    >
                    </input>
                    <label className={styles.label}>Email</label>
                    <input className={styles.input} type="email" value={this.state.email} onChange={this.handleChangeEmail}></input>
                    <button type="submit" className={styles.buttonAddContact}>Add</button>
                </form>
            </>
        )
    }
}

// PhoneBook.propTypes = {
//     onAddContact: PropTypes.func.isRequired,
//     contacts: PropTypes.arrayOf(PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         number: PropTypes.string.isRequired
//     }).isRequired)
// }

export default PhoneBook;