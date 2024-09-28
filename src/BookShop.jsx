import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import { FaAmbulance } from 'react-icons/fa'


const BookShop = () => {
  const [books, setBook] = useState([])
  const [oneBooks, setOneBook] = useState([])

  useEffect(() => {
    fetch('product.json')
      .then((res) => res.json())
      .then((data) => setBook(data))
  }, [])

  const handaleAdd = (book) => {
    //setOneBook([...oneBooks, book])
    // const bookExit = oneBooks.find((b) => b.id === book.id)
    // if (!bookExit) {
    //   setOneBook([...oneBooks, book])
    // } else {
    //   alert('Product is already in the cart')
    // }
    if (!oneBooks.some((item) => item.id === book.id)) {
      const newArray = [...oneBooks, book]
      setOneBook(newArray)
    }
  }
  const handaleDelete = (book) => {
    const newBook = oneBooks.filter((b) => b.id !== book.id)
    setOneBook(newBook)
  }

  const addQuantity = (id) => {
    const quantity = oneBooks.map((items) =>
      items.id === id ? { ...items, quantity: items.quantity + 1 } : items
    )
    setOneBook(quantity)
  }

  const minusQuantity = (id) => {
    const minusQ = oneBooks.map((items) =>
      items.id === id ? { ...items, quantity: items.quantity - 1 } : items
    )
    setOneBook(minusQ)
  }
  const totalPrice = oneBooks?.reduce((prevV, currentValue) => {
    return prevV + currentValue.Price * currentValue.quantity
  }, 0)

  const handleDeleteall = () => {
    console.log(1)
    setOneBook([])
  }
  console.log(oneBooks)

  return (
    <div className='flex'>
      <div className='w-[70%]'>
        <p>Length : {books?.length}</p>
        <div className='flex mt-7 justify-center gap-4'>
          {books?.map((book) => (
            <Card key={book.id} className='mt-6 w-96'>
              <CardHeader color='blue-gray' className='relative h-56'>
                <img src={book.img} alt='card-image' />
              </CardHeader>
              <CardBody>
                <Typography variant='h5' color='blue-gray' className='mb-2'>
                  {book.name}
                </Typography>
                <Typography>{book.Price}</Typography>
              </CardBody>
              <CardFooter className='pt-0'>
                <Button onClick={() => handaleAdd(book)}>
                  Add Book <FaAmbulance />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className='bg-blue-gray-800 w-[30%]'>
        <div>
          <p className='text-4xl text-center mt-4 text-blue-700 font-semibold'>
            CART
          </p>
          <div className='p-3 '>
            {oneBooks.map((book1, i) => (
              <div
                key={i}
                className='drop-shadow-lg bg-gray-50 p-2 rounded mt-3'
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <img
                      src={book1.img}
                      alt=''
                      className='h-[65px] w-[50px] p-1'
                    />
                  </div>

                  <div className='w-[170px]'>
                    <p className='text-sm'> {book1.name}</p>
                    <p className='text-xl'>${book1.Price}</p>
                    <button
                      onClick={() => handaleDelete(book1)}
                      className='text-[15px] border px-2 text-red-700 rounded'
                    >
                      Delete
                    </button>
                  </div>

                  <div className='flex  items-center border'>
                    <button
                      onClick={() => addQuantity(book1.id)}
                      className='  border px-2 text-[20px] font-bold'
                    >
                      +
                    </button>
                    <input
                      type='number'
                      value={book1.quantity}
                      className='w-[50px] text-center text-[20px] '
                    />
                    <button
                      onClick={() => minusQuantity(book1.id)}
                      className='border px-2 text-[20px] font-bold'
                      disabled={book1.quantity === 1}
                    >
                      -
                    </button>
                  </div>
                  <p className='text-xl'>${book1.Price * book1.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <h1 className='text-2xl font-bold mt-7 p-3'>
            Total Price of Product : $ {totalPrice}
          </h1>
          <button
            onClick={handleDeleteall}
            className='float-right border mr-5 px-4 py-2 font-bold text-red-600 border-red-500'
          >
            Delete All Product
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookShop
