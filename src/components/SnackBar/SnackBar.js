import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { connect } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

  function SnackBar(props) {
  let {language } = props;
  const {open, setOpen} = props;


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '20%' }}>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          {language === 'en' ? 'Required fields are empty!' : 'الحقول المطلوبة فارغة!'}
        </Alert>
      </Snackbar>
      
    </Stack>
  );
}

const mapStateToProps = state => {
  return {
      language: state.language,
      theme: state.theme
  }
}

const mapDispatchToProps = dispatch => {
  return {
      setLanguage: (lang) => {
          return dispatch({
              type: "TOGGLELANG",
              value: (lang === 'en') ? 'ar' : "en"
          })
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SnackBar)
