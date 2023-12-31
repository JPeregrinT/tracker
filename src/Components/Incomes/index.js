import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import '../Incomes/Income.css';

import axios from 'axios';
import Menu from '../Menu';
import IncomeList from './IncomesList';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const FormIncome = () => {

    const [refresh, toggle] = useState(false);
    const [incomeList, setIncomeList] = useState([])

    const [error, setError] = useState('');

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');


//sustituir peticiones***
    const addIncome = async () => {
        console.log('hola')
        let userId = window.localStorage.getItem('userId')

      
        try {
            await axios.post(`${backendUrl}/api/v1/add-income/${userId}`, {title, amount, description, category, date});
            toggle(!refresh)
                console.log("aaaa")
            
        } catch (error) {
            setError(error.response.data.error)
        }
    };

    const incomesGetter = async () => {
        const userId = window.localStorage.getItem('userId');
        try {
          const { data } = await axios.get(`${backendUrl}/api/v1/get-income/${userId}`);
          setIncomeList(data);
        } catch (error) {
          console.log('Error get Income', error);
        }
      };

  useEffect(() => {
    incomesGetter();
  }, []);

  const totalIncome = incomeList.reduce((total, income) => {
    const amount = income.amount.replace(/[$€]/g, '');
    return total + Number(amount);
  }, 0);





  return (
    <>
    <Menu/>

    <div id='income__container'>
        <div className='title_income'>
            <h2>Incomes</h2>
        </div>

         <div id='amount__totalIncomes'>
          <h4 className='title__totalIncome'>Total Income:</h4>
          <h1 id='total__income'>{totalIncome}</h1>
        </div>
        
        <div id='form__container__income'>
            <Form  className='custom__form__income'>
                <Form.Group>
                    <Form.Label className='title__label__income'>Title Income:</Form.Label>
                    <Form.Control value={title} onChange={e => setTitle(e.currentTarget.value)}required className='add__income' type='text' placeholder='Add Income' />
                </Form.Group>
                <Form.Group>
                    <Form.Control value={amount} onChange={e => setAmount(e.currentTarget.value)} required className='amount' type='text' placeholder='Add Amount' />
                </Form.Group>
                <Form.Group>
                    <Form.Control value={date} onChange={e => setDate(e.currentTarget.value)} className='date' type='date' />
                </Form.Group>
                <Form.Group className='select__category__income'>
                <Form.Select value={category} onChange={e => setCategory(e.currentTarget.value)}>
                    <option>Select category</option>
                    <option value='Education'>Education</option>
                    <option value='Groceries'>Groceries</option>
                    <option value='Health'>Health</option>
                    <option value='Subscriptions'>Subscriptions</option>
                    <option value='Takeaways'>Takeaways</option>
                    <option value='Clothing'>Clothing</option>
                    <option value='Travelling'>Travelling</option>
                    <option value='Other'>Other</option>
                </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Control value={description} onChange={e => setDescription(e.currentTarget.value)} className='amount' as='textarea' placeholder='Add description' />
                </Form.Group> <br/>
                <Button type='submit' onClick={addIncome} id='button__add' variant="outline-primary">Add Income</Button>
                {error &&  <p id='err__msg'>{error}</p>}
            </Form>
            
        <div id='income__list__container'>
            <IncomeList refresh={refresh}/>
        </div>
        </div>
   
    </div>
    
    </>
  )
}

export default FormIncome
