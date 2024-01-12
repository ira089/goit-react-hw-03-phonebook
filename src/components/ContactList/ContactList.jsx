import styles from './ContactList.module.css';
import ContactItems from 'components/ContactItems/ContactItems';

const ContactList = ({ items, deleteContact }) => {
  const elements = items.map(item => (
    <ContactItems
      key={item.id}
      id={item.id}
      number={item.number}
      name={item.name}
      deleteContact={deleteContact}
    />
  ));
  return <ul className={styles.list}>{elements}</ul>;
};

export default ContactList;
