import React, { Component } from 'react';
import styles from './Contacts.module.css';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import slide from './slideItems.module.css';

class Contacts extends Component {

    render() {
        const { onRemoveContact } = this.props;

        return (
            <div>
                <TransitionGroup component="ul" className={styles.list}>
                    {this.props.contactsArr.map(item => (
                        <CSSTransition key={item.ID} timeout={250} classNames={slide}>
                            <li className={styles.item} key={item.ID}>
                                {item.Name}: {item.number}
                                <button
                                    className={styles.buttonDelete}
                                    id={item.ID}
                                    onClick={() => onRemoveContact(item.ID)}>x
                                    </button>
                            </li>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </div>
        )
    }
}

Contacts.propTypes = {
    contactsAr: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    }).isRequired),
    onRemoveContact: PropTypes.func.isRequired
}

export default Contacts;