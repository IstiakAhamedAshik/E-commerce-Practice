import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './main/Main'
import BookShop from './BookShop'
import Blog from './Blog'

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      children: [
        {
          path: '/',
          element: <BookShop />,
        },
        {
          path: '/blog',
          element: <Blog />,
        },
      ],
    },
  ])
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
