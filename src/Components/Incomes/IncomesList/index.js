import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import '../IncomesList/IncomeList.css';
import { dateFormat } from '../../utils/dateFormat';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faGraduationCap,
  faShoppingBasket,
  faBriefcaseMedical,
  faHamburger,
  faTshirt,
  faPlane,
  faEllipsisH,
  faTv
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faBars,
  faTimes,
  faGraduationCap,
  faShoppingBasket,
  faBriefcaseMedical,
  faHamburger,
  faTshirt,
  faPlane,
  faEllipsisH,
  faTv
);

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const IncomeList = ({ refresh }) => {
  const [incomeList, setIncomeList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const userId = window.localStorage.getItem('userId');

  useEffect(() => {
    async function fetchData() {
      try {
        const filteredIncomeList = await filterCategory(userId, 'All');
        setIncomeList(filteredIncomeList);
      } catch (error) {
        console.log('Error fetching filtered income list', error);
      }
    }

    fetchData();
  }, []);

  const filterCategory = async (userId, category) => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/filter-income/${userId}`, {
        params: {
          category: category,
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error filtering category', error);
      throw error;
    }
  };

  const incomesGetter = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/v1/get-income/${userId}`);
      setIncomeList(data);
    } catch (error) {
      console.log('Error getting income', error);
    }
  };

  useEffect(() => {
    incomesGetter();
  }, []);

  const handleDeleteIncome = async (_id) => {
    try {
      await axios.delete(`${backendUrl}/api/v1/delete-income/${_id}`);
      incomesGetter();
    } catch (error) {
      console.log(error);
    }
  };

  const handleModifyIncome = (_id) => {
    const income = incomeList.find((item) => item._id === _id);
    setSelectedIncome(income);
    setShowModal(true);
  };
  const [selectedCategory, setSelectedCategory] = useState('');
  const CategorySelector = ({ userId, setIncomeList }) => {
   

    const handleCategoryChange = async (category) => {
      try {
        const filteredIncomeList = await filterCategory(userId, category);
        setIncomeList(filteredIncomeList);
        setSelectedCategory(category);
      } catch (error) {
        console.log('Error filtering category', error);
      }
    };

    return (
      <div className='selectByCategoryInInc'>
        <select id='filter__category' value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
          <option value="All">All</option>
          <option value="Education">Education</option>
          <option value="Groceries">Groceries</option>
          <option value="Health">Health</option>
          <option value="Subscriptions">Subscriptions</option>
          <option value="Takeaways">Takeaways</option>
          <option value="Clothing">Clothing</option>
          <option value="Travelling">Travelling</option>
          <option value="Other">Other</option>
        </select>
      </div>
    );
  };

  const IncomeCard = ({ title, amount, date, category, description, _id }) => {
    let icon = null;

    switch (category) {
      case 'Education':
        icon = <FontAwesomeIcon className='icon' icon='graduation-cap' />;
        break;
      case 'Groceries':
        icon = <FontAwesomeIcon className='icon' icon='shopping-basket' />;
        break;
      case 'Health':
        icon = <FontAwesomeIcon className='icon' icon='briefcase-medical' />;
        break;
      case 'Subscriptions':
        icon = <FontAwesomeIcon className='icon' icon='tv' />;
        break;
      case 'Takeaways':
        icon = <FontAwesomeIcon className='icon' icon='burger' />;
        break;
      case 'Clothing':
        icon = <FontAwesomeIcon className='icon' icon='tshirt' />;
        break;
      case 'Travelling':
        icon = <FontAwesomeIcon className='icon' icon='plane' />;
        break;
      default:
        icon = <FontAwesomeIcon className='icon' icon='ellipsis-h' />;
    }

    return (
      <div className='incomeList__container'>
        <div id='items__incomes'>
          {icon}
          <h5>{title}</h5>
          <p>{amount}</p>
          <date>{dateFormat(date)}</date>
          <p>{category}</p>
          <p>{description}</p>
          <Button type='submit' variant='secondary' id='mdfyIncome' onClick={() => handleModifyIncome(_id)}>
            Modify
          </Button>
          <Button type='submit' id='dltIncome' onClick={() => handleDeleteIncome(_id)}>
            Delete
          </Button>
        </div>
      </div>
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedIncome(null);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`${backendUrl}/api/v1/update-income/${selectedIncome._id}`, selectedIncome);
      handleCloseModal();
      incomesGetter();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setSelectedIncome({ ...selectedIncome, [e.target.name]: e.target.value });
  };

  return (
    <div id='income__card'>
      <label id='filterByCategory'>FILTER BY CATEGORY</label>
      <CategorySelector userId={userId} setIncomeList={setIncomeList} />
      {incomeList.map((income) => (
        <IncomeCard
          key={income._id}
          _id={income._id}
          title={income.title}
          amount={income.amount}
          date={income.date}
          category={income.category}
          description={income.description}
        />
      ))}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton className='modal__header'>
          <Modal.Title className='title__popup'>Modify Income</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal__body'>
          <div>
            <label className='label__popup'>Title:</label>
            <Form.Control
              type='text'
              name='title'
              className='input__popup'
              value={selectedIncome?.title || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='label__popup'>Amount:</label>
            <Form.Control
              type='text'
              name='amount'
              className='input__popup'
              value={selectedIncome?.amount || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='label__popup'>Date:</label>
            <Form.Control
              type='date'
              name='date'
              className='input__popup'
              value={selectedIncome?.date || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='label__popup'>Category:</label>
            <Form.Control
              type='text'
              name='category'
              className='input__popup'
              value={selectedIncome?.category || ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className='label__popup'>Description:</label>
            <Form.Control
              type='text'
              name='description'
              className='input__popup'
              value={selectedIncome?.description || ''}
              onChange={handleInputChange}
            />
          </div>
        </Modal.Body>
        <Modal.Footer id='modal__footer'>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button id='btn__saveChanges' onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IncomeList;
