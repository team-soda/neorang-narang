import DaumPostcode from 'react-daum-postcode';
import React, {useState} from "react";
import {InputLabel, TextField} from "@material-ui/core";

function ZipSearchComponent(props) {

    const [isOpen, setIsOpen] = useState(false);
    const [address, setAddress] = useState();
    const [shortAddress, setShortAddress] = useState();

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let halfAddress = data.sido + ' ' + data.sigungu + ' ' + data.roadname;
        let extraAddress = "";

        console.log(data);
        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setAddress(fullAddress);
        setShortAddress(halfAddress);
    };

    ZipSearchComponent.defaultProps = {
        style: {
            width: '100%',
            height: "400px",
            border: '1px solid whitesmoke',
            borderRadius: 20,
        },
    };

    const openSearchHandler = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="zipSearchDiv">
            <InputLabel className="inputLabel">주소</InputLabel>
            <TextField
                style={{width: '90%'}}
                id="standard-basic"
                variant="standard"
                name="location"
                value={address}
                onClick={openSearchHandler}
                helperText='실제 글에서는 상세주소를 제외한 주소가 출력됩니다.'
                fullWidth
            />
            <TextField style={{display: 'none'}} value={shortAddress} name="short_location"/>
            {isOpen && (
                <div>
                    <DaumPostcode onComplete={handleComplete} {...props} />
                </div>
            )}
        </div>
    );
}

export default ZipSearchComponent;