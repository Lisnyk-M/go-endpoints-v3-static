import React, { Component } from 'react';
import PhoneBook from './PhoneBook/PhoneBook';
import Contacts from './Contacts/Contacts';
import api from '../services/api';
import Filter from './Filter/Filter';
import styles from './App.module.css';
import Table from './Table/Table';

export default class App extends Component {
    state = {
        filter: '',
        contacts: [],
        name: '',
        error: '',
    };

    // fix bug for componentDidMount rerender
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.contacts !== this.state.contacts) {
            // localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
    }

    componentDidMount() { 
        api.getUsers()
            .then(res => this.setState({ contacts: res }))
            .catch(error => this.setState({ error: error.message }));
    }

    addContact = ({ name, email }) => {
        const ppp = api.addUser( name, email )

            ppp.then(res => {
                api.getUsers()
                    .then(res => this.setState({ contacts: res, error: '' }))                                                
                    .catch(error => this.setState({ error: error.message }));
            }).catch(error => this.setState({ error: error}));
    }

    existContact = contact => {
        const isExistContact = this.state.contacts.findIndex(contactState => {
            return contactState.Name.toLowerCase() === contact.name.toLowerCase()
        });
        return isExistContact > 0 ? true : false;
    }

    changeFilter = filter => {
        this.setState({ filter })
    }

    getVisibleContacts = () => {
        const { contacts, filter } = this.state;

        if (contacts.length > 0) {
            return contacts.filter(contact => {
                return contact.Name.toLowerCase().includes(filter.toLowerCase())

            })
        } else {
            return contacts;
        }
    }

    removeContact = contactId => {
        api.deleteUser(contactId);

        this.setState(prevState => {
            return {
                contacts: prevState.contacts.filter(({ ID }) => ID !== contactId)
            }
        })
    }

    render() {
        const { filter, contacts, error } = this.state;
        const visibleContacts = this.getVisibleContacts();

        return (
            <>
                <div className={styles.App}>
                    <PhoneBook
                        onAddContact={this.addContact}
                        contacts={contacts}
                        existContact={this.existContact}
                        error={error}
                    />
                    {/* <h2>Contacts</h2> */}
                    {/* <Contacts contactsArr={visibleContacts} onRemoveContact={this.removeContact} /> */}

                    <Table data={contacts} onRemoveContact={this.removeContact} />
                    {/* <Filter value={filter} onChangeFilter={this.changeFilter} /> */}
                </div>
            </>
        )
    }
}
