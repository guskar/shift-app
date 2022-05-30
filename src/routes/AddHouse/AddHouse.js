
import React from 'react'
import CreateHouseForm from '../../components/CreateHouseForm/CreateHouseForm'
import styles from './style.module.css'
/**
 * A Route component for adding a house.
 *
 * @returns {React.ReactElement} Renders the add housepage.
 */
const AddHouse = () => {
  return (
    <div className={styles.addHouseDiv}>
      <CreateHouseForm></CreateHouseForm>
    </div>
  )
}

export default AddHouse
