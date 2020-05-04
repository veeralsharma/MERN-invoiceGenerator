import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { saveAs } from 'file-saver';
import './App.css';
function App() {

  const [state,setState]=useState({
    invoiceno:0,
    items:[],
    customer_name:'',
    address:''
  })

  const [item,setItem]=useState({
    item_name:'',
    item_price:0
  })

  function itemHandler(e){
   
    setState({
      ...state,
      items:[...state.items,{[e.target.name]:e.target.value}]
    })
  }


  useEffect(()=>{
    const date=new Date();
    const num=Math.floor(Math.random()*100000)
    setState(
      {
        ...state,
        invoiceno:num
      }
    ) 

  },[])

  const onSubmit=(e)=>{
    e.preventDefault()
    axios.post('/create-pdf', state)
    .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

      saveAs(pdfBlob, 'newPdf.pdf');
    })
  }

  const handleChange = (e) => {
   setState(
     {
      ...state,
      [e.target.name]:e.target.value
     }
   )    
  }

  function addItem(e){
    e.preventDefault()
      setState(
        {
          ...state,
          items:[...state.items,item]
        }        
      )
      setItem({
        item_name:'',
        item_price:0
      })
  }

  const handleItemChange=(e)=>{
    setItem({
        ...item,
        [e.target.name]:e.target.value
    })
    
  }


  return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Enter Details for Your invoice</h1>
              <div className="form-group">
                <label htmlFor="email">Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="customer_name"
                  placeholder="Enter customer name"
                  value={state.customer_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Customer's' Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  placeholder="Enter customer's address"
                  value={state.address}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Give item details</label>
                <input
                  type="text"
                  className="form-control"
                  name="item_name"
                  placeholder="Enter item's name"
                  value={item.item_name}
                  onChange={handleItemChange}
                />
                 <input
                  type="number"
                  className="form-control"
                  name="item_price"
                  placeholder="Enter item's price"
                  value={item.item_price}
                  onChange={handleItemChange}
                />
              </div>
              <button
                onClick={addItem}
                className="btn btn-lg btn-danger btn-block"
              >
                Add item to cart
              </button>
         
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Generate Invoice
              </button>

              <h4>current cart is</h4>
              {
                state.items.map(obj => (<p>{obj.item_name}-{`Rs ${obj.item_price}`}</p>))
             }
            </form>
          </div>
        </div>
      </div>
   
  );
}

export default App;


  // createAndDownloadPdf = () => {
  //   axios.post('/create-pdf', this.state)
  //     .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
  //     .then((res) => {
  //       const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

  //       saveAs(pdfBlob, 'newPdf.pdf');
  //     })
  // }