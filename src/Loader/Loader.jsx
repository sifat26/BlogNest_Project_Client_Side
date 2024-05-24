import { Spinner } from '@material-tailwind/react';

function Loader() {
  return (
    <div className='flex justify-center items-center mt-20'>
      <Spinner color="blue" className="h-12 w-12" />
    </div>
  );
}

export default Loader;