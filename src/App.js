import { RouterProvider,  createBrowserRouter } from 'react-router-dom';
import Body from './components/Body';
import Events from './components/Events';
import CreateEvent from './components/CreateEvent';

const AppRouter = createBrowserRouter([
  {
      path: "/",
      element: <Body />,
      children: [
        {
          path: "/",
          element: <CreateEvent />
        },
          {
              path: "/events",
              element: <Events />
          },
      ]
  }
])

function App() {
  return (
   
      <div className="App">
        <RouterProvider router={AppRouter} />
      </div>
    
  );
}

export default App;
