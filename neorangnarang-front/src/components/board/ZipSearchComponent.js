import DaumPostcode from "react-daum-postcode";
import React, { useEffect, useState } from "react";
import { InputLabel, TextField } from "@material-ui/core";

function ZipSearchComponent(props) {
  const [isOpen, setIsOpen] = useState(false);

  /* useEffect(() => {
    console.log("주소주소주소");
    console.log(props);
    console.log(props.address);
    console.log(props.shortAddress);
  }, [props]); */

  ZipSearchComponent.defaultProps = {
    style: {
      width: "100%",
      height: "400px",
      border: "1px solid whitesmoke",
      borderRadius: 20,
    },
  };

  const openSearchHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="zipSearchDiv" style={{ marginTop: 30 }}>
      <InputLabel className="inputLabel">주소</InputLabel>
      <TextField
        style={{ width: "90%" }}
        id="standard-basic"
        variant="standard"
        name="location"
        value={props.address}
        onClick={openSearchHandler}
        helperText="실제 글에서는 상세주소를 제외한 주소가 출력됩니다."
        fullWidth
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        style={{ display: "none" }}
        value={props.shortAddress}
        name="short_location"
        InputProps={{
          readOnly: true,
        }}
      />
      {isOpen && (
        <div>
          <DaumPostcode onComplete={props.handleComplete} {...props} />
        </div>
      )}
    </div>
  );
}

export default ZipSearchComponent;
