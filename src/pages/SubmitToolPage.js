import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Box, 
  Paper, 
  Grid, 
  Checkbox, 
  FormGroup, 
  FormControlLabel, 
  IconButton, 
  Divider,
  Alert,
  AlertTitle,
  FormLabel,
  Snackbar,
  Card,
  CardContent
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled component for file upload
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function SubmitToolPage() {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    description: '',
    summary: '',
    type: 'Free',
    role: [],
    process: [],
    youtubeVideoId: '',
    keyFeatures: ['', '', ''],
    logo: null
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [isMultipleRole, setIsMultipleRole] = useState(false);
  const [isMultipleProcess, setIsMultipleProcess] = useState(false);
  const [featureCount, setFeatureCount] = useState(3);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showValidationError, setShowValidationError] = useState(false);

  // Available roles and processes for selection
  const availableRoles = [
    "Developer", 
    "Designer", 
    "Product Manager", 
    "Marketer", 
    "Tester", 
    "DevOps", 
    "Analyst"
  ];
  
  const availableProcesses = [
    "Research", 
    "Planning", 
    "Design", 
    "Development", 
    "Testing", 
    "Deployment", 
    "Maintenance"
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store the file object in the formData
      setFormData({
        ...formData,
        logo: file
      });

      // Create a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setLogoPreview(previewUrl);
    }
  };

  const handleRemoveLogo = () => {
    setFormData({
      ...formData,
      logo: null
    });
    setLogoPreview(null);
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...formData.keyFeatures];
    updatedFeatures[index] = value;
    setFormData({
      ...formData,
      keyFeatures: updatedFeatures
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      keyFeatures: [...formData.keyFeatures, '']
    });
    setFeatureCount(featureCount + 1);
  };

  const removeFeature = (index) => {
    const updatedFeatures = [...formData.keyFeatures];
    updatedFeatures.splice(index, 1);
    setFormData({
      ...formData,
      keyFeatures: updatedFeatures
    });
    setFeatureCount(featureCount - 1);
  };

  const handleRoleChange = (e) => {
    const { value, checked } = e.target;
    
    if (isMultipleRole) {
      // Handle multiple roles (checkboxes)
      if (checked) {
        setFormData({
          ...formData,
          role: [...formData.role, value]
        });
      } else {
        setFormData({
          ...formData,
          role: formData.role.filter(role => role !== value)
        });
      }
    } else {
      // Handle single role (dropdown)
      setFormData({
        ...formData,
        role: [value]
      });
    }
  };

  const handleProcessChange = (e) => {
    const { value, checked } = e.target;
    
    if (isMultipleProcess) {
      // Handle multiple processes (checkboxes)
      if (checked) {
        setFormData({
          ...formData,
          process: [...formData.process, value]
        });
      } else {
        setFormData({
          ...formData,
          process: formData.process.filter(process => process !== value)
        });
      }
    } else {
      // Handle single process (dropdown)
      setFormData({
        ...formData,
        process: [value]
      });
    }
  };

  const toggleMultipleRole = () => {
    setIsMultipleRole(!isMultipleRole);
    setFormData({
      ...formData,
      role: []
    });
  };

  const toggleMultipleProcess = () => {
    setIsMultipleProcess(!isMultipleProcess);
    setFormData({
      ...formData,
      process: []
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate text fields
    if (!formData.name.trim()) newErrors.name = "Tool name is required";
    if (!formData.url.trim()) newErrors.url = "URL is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.summary.trim()) newErrors.summary = "Summary is required";
    if (!formData.youtubeVideoId.trim()) newErrors.youtubeVideoId = "YouTube Video ID is required";
    
    // Validate logo
    if (!formData.logo) newErrors.logo = "Logo is required";
    
    // Validate roles
    if (formData.role.length === 0) newErrors.role = "At least one role is required";
    
    // Validate process
    if (formData.process.length === 0) newErrors.process = "At least one process is required";
    
    // Validate key features (at least 3 required)
    const validFeatures = formData.keyFeatures.filter(feature => feature.trim() !== '');
    if (validFeatures.length < 3) newErrors.keyFeatures = "At least 3 key features are required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const isValid = validateForm();
    
    if (!isValid) {
      setShowValidationError(true);
      // Scroll to top to show error message
      window.scrollTo(0, 0);
      return;
    }
    
    // Filter out empty key features
    const filteredFeatures = formData.keyFeatures.filter(feature => feature.trim() !== '');
    
    // Prepare final data
    const finalData = {
      ...formData,
      keyFeatures: filteredFeatures,
      // Convert role and process to strings if they're single values
      role: isMultipleRole ? formData.role : formData.role[0] || ''
    };
    
    // In a real application, this would submit the data to your backend
    console.log('Submitted data:', finalData);
    
    // In a real app, you would use FormData to send the file
    if (finalData.logo) {
      console.log('Logo file:', finalData.logo.name, finalData.logo.type, finalData.logo.size);

    }
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form after a delay
    setTimeout(() => {
      setFormData({
        name: '',
        url: '',
        description: '',
        summary: '',
        type: 'Free',
        role: [],
        process: [],
        youtubeVideoId: '',
        keyFeatures: ['', '', ''],
        logo: null
      });
      setLogoPreview(null);
      setFeatureCount(3);
      setFormSubmitted(false);
      setErrors({});
      setShowValidationError(false);
    }, 5000);
  };

  return (
    <div className="submit-tool-page">
      <Header />
      <Container maxWidth="md" sx={{ py: 5 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          align="center" 
          gutterBottom 
          color="black"
          sx={{ 
            fontWeight: 700, 
            textTransform: 'uppercase',
            letterSpacing: 1,
            mb: 2
          }}
        >
          Submit a new AI tool
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          color="black" 
          paragraph
          sx={{ 
            fontWeight: 600, 
            fontSize: '1.2rem',
            mb: 4
          }}
        >
          Know a great AI tool for web development that's not on our platform? Submit it here!
        </Typography>
        
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: '#7c8187' }}>
          {/* Explanatory content */}
          <Box sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 255)', 
            p: 3, 
            borderRadius: 2, 
            mb: 3,
            border: '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <Typography variant="h6" gutterBottom>
              How it works
            </Typography>
            <Typography variant="body2" paragraph>
              Our platform aims to create a comprehensive directory of AI tools for web development. By submitting a tool, you're helping the community discover valuable resources that can enhance their workflow.
            </Typography>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    1. Submit Details
                  </Typography>
                  <Typography variant="body2">
                    Fill out the form with accurate information about the AI tool including its features and target users.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    2. Review Process
                  </Typography>
                  <Typography variant="body2">
                    Our team will review your submission to ensure it meets our quality standards and is relevant to web development.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                    3. Publication
                  </Typography>
                  <Typography variant="body2">
                    Once approved, the tool will be published on our platform where users can discover and utilize it.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          
          {showValidationError && Object.keys(errors).length > 0 && (
            <Alert 
              severity="error" 
              variant="filled"
              sx={{ my: 3 }}
            >
              <AlertTitle>Please fix the following errors:</AlertTitle>
              <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
          
          {formSubmitted ? (
            <Alert 
              severity="success" 
              variant="filled"
              sx={{ my: 3 }}
            >
              <AlertTitle>Thank you for your submission!</AlertTitle>
              Our team will review your tool shortly and get back to you if we need additional information.
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              {/* Basic Information Section */}
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Basic Information
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="name"
                        label="Tool Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        variant="outlined"
                        error={!!errors.name}
                        helperText={errors.name || ''}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="url"
                        label="Website URL"
                        name="url"
                        type="url"
                        value={formData.url}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="https://example.com"
                        error={!!errors.url}
                        helperText={errors.url || ''}
                      />
                    </Grid>
                    
                    <Grid item xs={12} sm={8}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <FormLabel 
                          component="legend" 
                          sx={{ mb: 1 }}
                          required
                          error={!!errors.logo}
                        >
                          Logo Image
                        </FormLabel>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            sx={{ height: 56 }}
                            color={errors.logo ? "error" : "primary"}
                          >
                            Upload Logo
                            <VisuallyHiddenInput 
                              type="file" 
                              accept="image/*"
                              onChange={handleLogoUpload}
                            />
                          </Button>
                          {logoPreview && (
                            <>
                              <Box 
                                component="img" 
                                src={logoPreview} 
                                alt="Logo preview"
                                sx={{ 
                                  height: 80, 
                                  width: 80, 
                                  objectFit: 'contain',
                                  border: '1px solid #e0e0e0',
                                  borderRadius: 1,
                                  p: 1
                                }}
                              />
                              <IconButton 
                                color="error" 
                                onClick={handleRemoveLogo}
                                size="small"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </>
                          )}
                        </Box>
                        <Typography 
                          variant="caption" 
                          color={errors.logo ? "error" : "text.secondary"} 
                          sx={{ mt: 1 }}
                        >
                          {errors.logo || "Upload a logo for your tool (PNG or JPG, max 2MB)"}
                        </Typography>
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth required error={!!errors.type}>
                        <InputLabel id="type-label">Pricing Type</InputLabel>
                        <Select
                          labelId="type-label"
                          id="type"
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          label="Pricing Type"
                        >
                          <MenuItem value="Free">Free</MenuItem>
                          <MenuItem value="Freemium">Freemium</MenuItem>
                          <MenuItem value="Paid">Paid</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              
              {/* Description Section */}
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Description & Details
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="description"
                        label="Short Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={2}
                        placeholder="Write a concise description of what the tool does (1-2 sentences)"
                        helperText={errors.description || "This appears in the tool cards on the homepage"}
                        error={!!errors.description}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="summary"
                        label="Detailed Summary"
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        variant="outlined"
                        multiline
                        rows={4}
                        placeholder="Provide a comprehensive summary of the tool's purpose, features, and benefits (3-5 sentences)"
                        helperText={errors.summary || "This appears on the tool's detail page"}
                        error={!!errors.summary}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="youtubeVideoId"
                        label="YouTube Video ID"
                        name="youtubeVideoId"
                        value={formData.youtubeVideoId}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="e.g., dQw4w9WgXcQ"
                        helperText={errors.youtubeVideoId || "Enter only the ID part from a YouTube URL"}
                        error={!!errors.youtubeVideoId}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              
              {/* Target Section */}
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Target & Process
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <FormLabel component="legend" required error={!!errors.role}>Target Role</FormLabel>
                          <Button 
                            size="small" 
                            onClick={toggleMultipleRole}
                            variant="outlined"
                          >
                            {isMultipleRole ? "Single Role" : "Multiple Roles"}
                          </Button>
                        </Box>
                        
                        {isMultipleRole ? (
                          <FormGroup>
                            <Grid container spacing={1}>
                              {availableRoles.map(role => (
                                <Grid item xs={6} key={role}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={formData.role.includes(role)}
                                        onChange={handleRoleChange}
                                        value={role}
                                        name="role"
                                      />
                                    }
                                    label={role}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </FormGroup>
                        ) : (
                          <FormControl fullWidth required error={!!errors.role}>
                            <InputLabel id="role-label">Select a role</InputLabel>
                            <Select
                              labelId="role-label"
                              id="role"
                              value={formData.role[0] || ''}
                              onChange={handleRoleChange}
                              label="Select a role"
                              name="role"
                            >
                              {availableRoles.map(role => (
                                <MenuItem key={role} value={role}>{role}</MenuItem>
                              ))}
                            </Select>
                            {errors.role && (
                              <Typography color="error" variant="caption" sx={{ mt: 0.5, ml: 1.5 }}>
                                {errors.role}
                              </Typography>
                            )}
                          </FormControl>
                        )}
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <FormLabel component="legend" required error={!!errors.process}>Development Process</FormLabel>
                          <Button 
                            size="small" 
                            onClick={toggleMultipleProcess}
                            variant="outlined"
                          >
                            {isMultipleProcess ? "Single Process" : "Multiple Processes"}
                          </Button>
                        </Box>
                        
                        {isMultipleProcess ? (
                          <FormGroup>
                            <Grid container spacing={1}>
                              {availableProcesses.map(process => (
                                <Grid item xs={6} key={process}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={formData.process.includes(process)}
                                        onChange={handleProcessChange}
                                        value={process}
                                        name="process"
                                      />
                                    }
                                    label={process}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </FormGroup>
                        ) : (
                          <FormControl fullWidth required error={!!errors.process}>
                            <InputLabel id="process-label">Select a process</InputLabel>
                            <Select
                              labelId="process-label"
                              id="process"
                              value={formData.process[0] || ''}
                              onChange={handleProcessChange}
                              label="Select a process"
                              name="process"
                            >
                              {availableProcesses.map(process => (
                                <MenuItem key={process} value={process}>{process}</MenuItem>
                              ))}
                            </Select>
                            {errors.process && (
                              <Typography color="error" variant="caption" sx={{ mt: 0.5, ml: 1.5 }}>
                                {errors.process}
                              </Typography>
                            )}
                          </FormControl>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              
              {/* Key Features Section */}
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Key Features
                  </Typography>
                  <Divider sx={{ mb: 3 }} />
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    List the main features that make this tool valuable for web developers
                  </Typography>
                  
                  {errors.keyFeatures && (
                    <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                      {errors.keyFeatures}
                    </Typography>
                  )}
                  
                  {formData.keyFeatures.map((feature, index) => (
                    <Box key={index} sx={{ mb: 2, position: 'relative' }}>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        variant="outlined"
                        label={`Feature ${index + 1}`}
                        placeholder={`Describe a key feature of the tool`}
                        required={index < 3}
                        error={index < 3 && !!errors.keyFeatures && feature.trim() === ''}
                        InputProps={{
                          endAdornment: index >= 3 ? (
                            <IconButton
                              edge="end"
                              onClick={() => removeFeature(index)}
                              color="error"
                              size="small"
                              sx={{ position: 'absolute', top: 8, right: 8 }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          ) : null
                        }}
                      />
                    </Box>
                  ))}
                  
                  {featureCount < 7 && (
                    <Button
                      startIcon={<AddIcon />}
                      onClick={addFeature}
                      variant="outlined"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Add Another Feature
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  size="large"
                  sx={{ px: 4, py: 1.5 }}
                >
                  Submit Tool
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Container>
      <Footer />
    </div>
  );
}

export default SubmitToolPage; 