import react from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';

function CreateNewBoardForm() {
  const {t} = useTranslation();
  const titleLabel = t('createNewBoardForm:boardTitle');
  const descriptionLabel = t('createNewBoardForm:boardDescription');
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="inputTitle" variant="outlined" label={titleLabel} color="info" />
      <TextField id="inputDescription" variant="outlined" label={descriptionLabel} color="info" />
      <Button variant="outlined" color="info">create</Button>
    </Box>
  );
}

export default CreateNewBoardForm;