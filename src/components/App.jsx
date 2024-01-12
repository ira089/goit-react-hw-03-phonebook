import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './ContactForm/ContactForm.module.css';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './ContactList/Filter';

const LS_Key_Contact = 'phoneContact';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(LS_Key_Contact));
    console.log(contacts);
    if (contacts?.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      console.log('update');
      localStorage.setItem(LS_Key_Contact, JSON.stringify(contacts));
    }
  }

  addContact = contact => {
    if (this.isDublicate(contact)) {
      return alert(`${contact.name} is already in contacts`);
    }
    this.setState(prevStat => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      return {
        contacts: [...prevStat.contacts, newContact],
      };
    });
  };

  filterContacts = evt => {
    this.setState({
      filter: evt.target.value,
    });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  isDublicate(evt) {
    const { contacts } = this.state;
    const normalizedName = evt.name.toLowerCase();
    // console.log(normalizedName);
    const dublicate = contacts.find(
      contact => contact.name.toLocaleLowerCase() === normalizedName
    );
    return dublicate;
  }
  deleteContact = id => {
    // console.log(id);
    this.setState(({ contacts }) => {
      const newContacts = contacts.filter(contact => contact.id !== id);

      return {
        contacts: newContacts,
      };
    });
  };

  render() {
    const {
      addContact,
      state,
      filterContacts,
      getFilteredContacts,
      deleteContact,
    } = this;
    const visibleContacts = getFilteredContacts();
    return (
      <div className={styles.wrap}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />

        <h2>Contacts</h2>
        <Filter value={state.filter} changeFitler={filterContacts} />
        <ContactList items={visibleContacts} deleteContact={deleteContact} />
      </div>
    );
  }
}

export default App;
