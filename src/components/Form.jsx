import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  styled,
} from '@mui/material';

// Color palette used throughout the form and dialogs
const COLORS = {
  background: '#2b2b2b',
  inputBackground: '#1E1E1E',
  text: 'white',
  label: '#aaa',
  teal: '#009688',
  borderDefault: '#555',
  borderHover: '#aaa',
  dialogBorder: '#444',
  buttonHover: '#141414',
};

// Layout and sizing constants for the form
const FORM = {
  maxWidth: 400,
  spacing: 2,
  padding: 4,
  borderRadius: 1,
};

// PIN input configuration
const PIN_FORMAT = {
  maxDigits: 16,
};

// Styled dark-themed TextField for consistent dark mode UI
const DarkTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    backgroundColor: COLORS.inputBackground,
    color: COLORS.text,
  },
  '& .MuiInputBase-input': {
    color: COLORS.text,
  },
  '& .MuiInputBase-input:-webkit-autofill': {
    WebkitBoxShadow: `0 0 0 1000px ${COLORS.inputBackground} inset`,
    WebkitTextFillColor: COLORS.text,
    transition: 'background-color 9999s ease-in-out 0s',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: COLORS.borderDefault,
  },
  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: COLORS.borderHover,
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: COLORS.teal,
  },
  '& .MuiInputLabel-root': {
    color: COLORS.label,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: COLORS.teal,
  },
}));

// Form container with dark background and layout styling
const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(FORM.spacing),
  width: '100%',
  maxWidth: FORM.maxWidth,
  backgroundColor: COLORS.background,
  padding: theme.spacing(FORM.padding),
  borderRadius: `${FORM.borderRadius}rem`,
  boxShadow: theme.shadows[3],
}));

// Heading styling for form title
const FormHeading = styled(Typography)({
  color: COLORS.text,
  textAlign: 'center',
  marginBottom: '0.5rem',
});

// Styled dialog container for popup confirmation
const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: COLORS.background,
    color: COLORS.text,
    borderRadius: `${FORM.borderRadius}rem`,
    boxShadow: theme.shadows[5],
  },
}));

// Dialog title with teal accent
const StyledDialogTitle = styled(DialogTitle)({
  color: COLORS.teal,
  fontWeight: 'bold',
  borderBottom: `1px solid ${COLORS.dialogBorder}`,
});

// Dialog content section
const StyledDialogContent = styled(DialogContent)({
  color: COLORS.text,
  borderBottom: `1px solid ${COLORS.dialogBorder}`,
});

// Dialog actions section
const StyledDialogActions = styled(DialogActions)({
  padding: '1rem',
  justifyContent: 'flex-end',
});

// Custom button with white border and teal hover
const TealButton = styled(Button)({
  color: COLORS.text,
  backgroundColor: 'transparent',
  border: `1px solid ${COLORS.text}`,
  borderRadius: '0.5rem',
  padding: '0.375rem 1rem',
  '&:hover': {
    backgroundColor: COLORS.buttonHover,
    color: COLORS.teal,
    borderColor: COLORS.text,
  },
});

// Main form component
const Form = () => {
  // State for form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    guess: '',
    pin: '',
  });

  // State to control dialog visibility after form submission
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes and update form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission handler with PIN length validation
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pin.length !== PIN_FORMAT.maxDigits) return;
    setSubmitted(true);
  };

  // Close the confirmation dialog
  const handleClose = () => {
    setSubmitted(false);
  };

  // Flag used to trigger PIN helperText and error styling
  const isPinError = formData.pin.length > 0 && formData.pin.length !== PIN_FORMAT.maxDigits;

  return (
    <>
      {/* Main form wrapper */}
      <FormContainer component="form" onSubmit={handleSubmit}>
        {/* Form heading */}
        <FormHeading variant="h5">Spidr Design Challenge Form</FormHeading>

        {/* Input fields */}
        <DarkTextField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
        <DarkTextField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
        <DarkTextField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
        <DarkTextField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
        <DarkTextField label="Guess the Air Fryer’s Cost ($)" name="guess" type="number" value={formData.guess} onChange={handleChange} required />
        
        {/* PIN input with maxLength, numeric input mode, and inline validation */}
        <DarkTextField
          label="Spidr PIN (16 digits)"
          name="pin"
          type="password"
          value={formData.pin}
          onChange={handleChange}
          inputProps={{
            maxLength: PIN_FORMAT.maxDigits, // Prevents input beyond 16 digits
            inputMode: 'numeric',            // Shows numeric keyboard on mobile
            pattern: '[0-9]*',               // Hints to browsers: only digits allowed
          }}
          error={isPinError}
          helperText={isPinError ? 'PIN must be exactly 16 digits.' : ''}
          required
        />

        {/* Submit button */}
        <TealButton type="submit">Submit</TealButton>
      </FormContainer>

      {/* Confirmation dialog shown only on successful submission */}
      {submitted && (
        <StyledDialog open onClose={handleClose}>
          <StyledDialogTitle>Submitted Information</StyledDialogTitle>
          <StyledDialogContent dividers>
            <Typography><strong>First Name:</strong> {formData.firstName}</Typography>
            <Typography><strong>Last Name:</strong> {formData.lastName}</Typography>
            <Typography><strong>Phone Number:</strong> {formData.phone}</Typography>
            <Typography><strong>Email:</strong> {formData.email}</Typography>
            <Typography><strong>Guess:</strong> ${formData.guess}</Typography>
            <Typography><strong>PIN:</strong> {formData.pin}</Typography>
          </StyledDialogContent>
          <StyledDialogActions>
            <TealButton onClick={handleClose}>Close</TealButton>
          </StyledDialogActions>
        </StyledDialog>
      )}
    </>
  );
};

export default Form;
