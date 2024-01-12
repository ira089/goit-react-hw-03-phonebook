import styles from './ContactList.module.css';

const Filter = ({ value, changeFitler }) => {
  return (
    <>
      <p>Find contacts by name</p>
      <input
        className={styles.filter}
        onChange={changeFitler}
        name="filter"
        value={value}
        placeholder="Search"
      />
    </>
  );
};

export default Filter;
