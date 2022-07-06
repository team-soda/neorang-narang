import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";

export default function AlertComponent() {
    const [open, setOpen] = React.useState(true);

    return (
        <Box sx={{width: '100%'}}>
            <Collapse in={open}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                    sx={{mb: 2}}
                >
                    검색 외에도 원하는 조건으로 필터를 적용할 수 있어요!
                </Alert>
            </Collapse>
            {/*<Button*/}
            {/*    sx={{float: 'right'}}*/}
            {/*    disabled={open}*/}
            {/*    onClick={() => {*/}
            {/*        setOpen(true);*/}
            {/*    }}*/}
            {/*>*/}
            {/*    👆🏻*/}
            {/*</Button>*/}
        </Box>
    );
}
