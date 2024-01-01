import React from "react";

const UploadPage = () => {
  return (
    <div>
      <h1>Upload Photo</h1>
      <form action="/action_page.php">
        <input type="file" name="filename" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default UploadPage;