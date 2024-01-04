import React, {useEffect, useState} from "react";
import PlantIdApi from "./api";
import NotFound from "./ErrorSuccessMessages/NotFound";
import { Link, Navigate } from "react-router-dom";

const UploadPage = () => {
  const [scientificName, setScientificName] = useState('');
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  
  // useEffect(() => {
  //   const getNameFromPhoto = async() => {
  //     try {
  //       const resp = await PlantIdApi.postPlantPhoto();
  //       console.log('resp in front end UploadPage: ', resp);
  //       setScientificName(resp);
  //       if (resp) {
  //         setImageUploaded(true);
  //       }
  //     } catch (err) {
  //       console.error('Error fetching plant name in UploadPage component', err);
  //     }
  //   };
  //   getNameFromPhoto();
  // }, [scientificName]);

  // if (scientificName === null) {
  //   return (
  //     <>
  //       <NotFound />
  //     </>
  //   );
  // }

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     setIsLoading(true);
  //     let result = await PlantIdApi.postPlantPhoto();
  //     console.log('result in front end UploadPage handleSubmit: ', result);
  //     if (result) {
  //       setImageUploaded(true);
  //       return <Navigate to="/plant/details"/>
  //     } else {
  //       console.error('Error uploading image from UploadPage component');
  //     }
  //   } catch (err) {
  //     console.error('Error uploading image from UploadPage component: ', err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const fileInput = e.target.querySelector('input[name="plantImg"]');
      const file = fileInput.files[0];
      console.log('fileInput in front end UploadPage', fileInput);
      console.log('file in front end UploadPage', file);

      if (!file) {
        console.error('Please select an image before submitting');
        return;
      }

      const result = await PlantIdApi.postPlantPhoto(file);
      console.log('result in front end UploadPage handleSubmit: ', result);

      if (result) {
        setImageUploaded(true);
        return <Navigate to="/plant/details"/>
      } else {
        console.error('Error uploading image from UploadPage component');
      }
    } catch (err) {
      console.error('Error uploading image from UploadPage component: ', err);
    } finally {
      setIsLoading(false);
    }
  }
  
  const pageIfNotUploaded = () => {
    return (
      <div>
        <h1>Upload Photo</h1>
        <form onSubmit={handleSubmit} action="http://localhost:3001/plants/upload" encType="multipart/form-data">
          <input type="file" name="plantImg" />
          <input type="submit" />
        </form>
      </div>
    );
  }

  const pageIfUploaded = () => {
    return (
      <div>
        {/* <h1>Your image is: {scientificName}</h1> */}
        <h1>Your image is: put plant name here</h1>
        <button>
          <Link to='/plant/details'>Plant Details</Link>
        </button>
      </div>
    );
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>
  }

  return (
    <div>
      {imageUploaded ? pageIfUploaded() : pageIfNotUploaded()}
    </div>
  );

}

export default UploadPage;