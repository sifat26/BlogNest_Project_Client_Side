/* eslint-disable react/prop-types */
const ShowComment = ({ comnt }) => {
  // console.log(comnt);

  return (
    <div>
        
      <div className="flex  items-center w-full px-6 py-6 mx-auto mt-10 bg-white border border-gray-200 rounded-lg sm:px-8 md:px-12 sm:py-8 sm:shadow lg:w-5/6 xl:w-2/3">
        <a href="#" className="flex items-center mt-6 mb-6 mr-6">
          <img
            src={comnt.commentOwnerPhotoUrl}
            alt="avatar"
            className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
          />
        </a>
        <div>
          <h3 className="text-lg font-bold text-purple-500 sm:text-xl md:text-2xl">
            {comnt.commentOwnerName}
          </h3>
          <p className="mt-2 text-base text-gray-600 sm:text-lg md:text-normal">
            {comnt.comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShowComment;
