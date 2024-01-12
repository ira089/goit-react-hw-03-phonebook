import styles from '../ContactList/ContactList.module.css';

const ContactItems = ({ name, number, id, deleteContact }) => {
  return (
    <li key={id} id={id}>
      {name}: {number}{' '}
      <button
        className={styles.btnDel}
        onClick={() => deleteContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

export default ContactItems;
