import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { 
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Alert
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import './ContactPage.css';

/**
 * Contact Page Component
 * Provides a contact form and information using Material UI components
 */
function ContactPage() {
  // Form state management
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Form submission status state
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });

  // Form validation errors state
  const [formErrors, setFormErrors] = useState({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /**
   * Validates form data
   * Returns true if form is valid
   */
  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  /**
   * Handles form field changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  /**
   * Handles form submission
   * @param {Event} e - The submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate a successful submission
      setFormStatus({
        submitted: true,
        success: true,
        message: 'Thank you for your message! We will get back to you soon.'
      });
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      });
    } else {
      setFormStatus({
        submitted: true,
        success: false,
        message: 'Please correct the errors in the form.'
      });
    }
  };

  return (
    <div className="contact-page">
      <PageTitle 
        title="Contact Us" 
        description="Get in touch with WebDevAI Tools team. We're here to help you with any questions about our AI tools platform."
      />
      <Header />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Page Header */}
        <Box textAlign="center" mb={5}>
          <Typography variant="h3" component="h1" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Have a question about AI tools or want to suggest a new tool? We'd love to hear from you. 
            Fill out the form below and we'll respond as soon as possible.
          </Typography>
        </Box>
        
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden'
          }}
        >
          <Grid container>
            {/* Left Side - Contact Information */}
            <Grid item xs={12} md={4} 
              sx={{ 
                backgroundColor: '#3498db',
                color: 'white',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: {
                  xs: '10px 10px 0 0',
                  md: '10px 0 0 10px'
                }
              }}
            >
              <Box>
                <Typography variant="h5" gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 4 }}>
                  Feel free to reach out to us using any of the methods below.
                </Typography>
                
                {/* Contact Methods List */}
                <List sx={{ p: 0 }}>
                  {/* Location */}
                  <ListItem sx={{ px: 0, py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 50 }}>
                      <Avatar sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}>
                        <span role="img" aria-label="location">📍</span>
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="subtitle2">Our Location</Typography>}
                      secondary={<Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>123 AI Technology Park, San Francisco, CA 94103</Typography>}
                    />
                  </ListItem>
                  
                  {/* Phone */}
                  <ListItem sx={{ px: 0, py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 50 }}>
                      <Avatar sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}>
                        <span role="img" aria-label="phone">📞</span>
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="subtitle2">Phone Number</Typography>}
                      secondary={
                        <Typography 
                          variant="body2" 
                          component="a" 
                          href="tel:+14155552671"
                          sx={{ 
                            color: 'white', 
                            opacity: 0.8,
                            textDecoration: 'none',
                            '&:hover': { opacity: 1, textDecoration: 'underline' }
                          }}
                        >
                          +1 (415) 555-2671
                        </Typography>
                      }
                    />
                  </ListItem>
                  
                  {/* Email */}
                  <ListItem sx={{ px: 0, py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 50 }}>
                      <Avatar sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}>
                        <span role="img" aria-label="email">✉️</span>
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="subtitle2">Email Address</Typography>}
                      secondary={
                        <Typography 
                          variant="body2" 
                          component="a" 
                          href="mailto:contact@aitools-platform.com"
                          sx={{ 
                            color: 'white', 
                            opacity: 0.8,
                            textDecoration: 'none',
                            '&:hover': { opacity: 1, textDecoration: 'underline' }
                          }}
                        >
                          contact@aitools-platform.com
                        </Typography>
                      }
                    />
                  </ListItem>
                  
                  {/* Working Hours */}
                  <ListItem sx={{ px: 0, py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: 50 }}>
                      <Avatar sx={{ 
                        width: 40, 
                        height: 40, 
                        bgcolor: 'rgba(255,255,255,0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.2rem'
                      }}>
                        <span role="img" aria-label="clock">🕒</span>
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText 
                      primary={<Typography variant="subtitle2">Working Hours</Typography>}
                      secondary={
                        <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                          Monday - Friday: 9am - 5pm<br />
                          Saturday: 10am - 2pm
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
              
              {/* Social Media Links */}
              <Box mt={4}>
                <Typography variant="subtitle2" gutterBottom>
                  Connect With Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <Avatar
                    component="a"
                    href="https://facebook.com"
                    target="_blank"
                    sx={{ 
                      width: 36, 
                      height: 36, 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                      color: 'white',
                      textDecoration: 'none'
                    }}
                  >
                    <FacebookIcon fontSize="small" />
                  </Avatar>
                  <Avatar
                    component="a"
                    href="https://twitter.com"
                    target="_blank"
                    sx={{ 
                      width: 36, 
                      height: 36, 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                      color: 'white',
                      textDecoration: 'none'
                    }}
                  >
                    <TwitterIcon fontSize="small" />
                  </Avatar>
                  <Avatar
                    component="a"
                    href="https://linkedin.com"
                    target="_blank"
                    sx={{ 
                      width: 36, 
                      height: 36, 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                      color: 'white',
                      textDecoration: 'none'
                    }}
                  >
                    <LinkedInIcon fontSize="small" />
                  </Avatar>
                  <Avatar
                    component="a"
                    href="https://instagram.com"
                    target="_blank"
                    sx={{ 
                      width: 36, 
                      height: 36, 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                      color: 'white',
                      textDecoration: 'none'
                    }}
                  >
                    <InstagramIcon fontSize="small" />
                  </Avatar>
                </Box>
              </Box>
            </Grid>
            
            {/* Right Side - Contact Form */}
            <Grid item xs={12} md={8}>
              <Box sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Send Us a Message
                </Typography>
                
                {/* Alert for form submission feedback */}
                {formStatus.submitted && (
                  <Alert 
                    severity={formStatus.success ? "success" : "error"}
                    sx={{ my: 2 }}
                  >
                    {formStatus.message}
                  </Alert>
                )}
                
                {/* Contact Form */}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    {/* First Name */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={!!formErrors.firstName}
                        helperText={formErrors.firstName}
                        margin="normal"
                      />
                    </Grid>
                    {/* Last Name */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={!!formErrors.lastName}
                        helperText={formErrors.lastName}
                        margin="normal"
                      />
                    </Grid>
                    {/* Email */}
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                        margin="normal"
                      />
                    </Grid>
                    {/* Subject */}
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="subject"
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={!!formErrors.subject}
                        helperText={formErrors.subject}
                        margin="normal"
                      />
                    </Grid>
                    {/* Message */}
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="message"
                        label="Message"
                        name="message"
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!formErrors.message}
                        helperText={formErrors.message}
                        margin="normal"
                      />
                    </Grid>
                  </Grid>
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{ 
                      mt: 3, 
                      mb: 2, 
                      py: 1.5, 
                      px: 4,
                      bgcolor: '#3498db',
                      '&:hover': {
                        bgcolor: '#2980b9'
                      }
                    }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}

export default ContactPage; 