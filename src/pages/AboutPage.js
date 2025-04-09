import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageTitle from '../components/PageTitle';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  Paper,
  useTheme,
  alpha,
  Avatar,
  Stack,
  Divider
} from '@mui/material';
import { 
  RocketLaunch, 
  Search, 
  People, 
  Lightbulb, 
  CheckCircle, 
  Star, 
  Chat, 
  Sync, 
  Security,
  Code,
  AutoAwesome,
  Psychology,
  Speed
} from '@mui/icons-material';

function AboutPage() {
  const theme = useTheme();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`
    }}>
      <PageTitle 
        title="About Us" 
        description="Learn about WebDevAI Tools - Empowering developers with cutting-edge AI tools for modern web development"
      />
      <Header />
      <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
        {/* Hero Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 6, 
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{ 
                fontWeight: 800,
                mb: 2
              }}
            >
              About WebDevAI Tools
            </Typography>
            <Typography variant="h6" sx={{ maxWidth: '800px', mx: 'auto', mb: 3 }}>
              Empowering developers with cutting-edge AI tools for modern web development
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Avatar sx={{ bgcolor: 'white', color: theme.palette.primary.main, width: 56, height: 56 }}>
                <Code fontSize="large" />
              </Avatar>
              <Avatar sx={{ bgcolor: 'white', color: theme.palette.primary.main, width: 56, height: 56 }}>
                <Psychology fontSize="large" />
              </Avatar>
              <Avatar sx={{ bgcolor: 'white', color: theme.palette.primary.main, width: 56, height: 56 }}>
                <Speed fontSize="large" />
              </Avatar>
            </Stack>
          </Box>
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              right: 0, 
              bottom: 0, 
              opacity: 0.1,
              background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              zIndex: 0
            }}
          />
        </Paper>

        {/* Vision Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`
              }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.primary.dark,
                  mb: 3
                }}
              >
                Our Vision
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
                We envision a future where AI tools are seamlessly integrated into web development,
                enabling developers to focus on creativity and innovation.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    bgcolor: theme.palette.primary.main,
                    boxShadow: 3
                  }}
                >
                  <AutoAwesome sx={{ fontSize: 60 }} />
                </Avatar>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                height: '100%',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: `linear-gradient(135deg, ${alpha(theme.palette.secondary.light, 0.1)}, ${alpha(theme.palette.secondary.main, 0.05)})`
              }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.secondary.dark,
                  mb: 3
                }}
              >
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', mb: 3 }}>
                To curate and present the most useful AI tools for web development, helping developers 
                save time and improve their productivity.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Avatar 
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    bgcolor: theme.palette.secondary.main,
                    boxShadow: 3
                  }}
                >
                  <RocketLaunch sx={{ fontSize: 60 }} />
                </Avatar>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Objectives Section */}
        <Typography 
          variant="h3" 
          component="h2" 
          align="center"
          sx={{ 
            fontWeight: 700,
            mb: 4,
            color: theme.palette.text.primary
          }}
        >
          Our Objectives
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: theme.shadows[10]
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Star sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Curate Quality Tools
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: theme.shadows[10]
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Search sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Facilitate Discovery
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: theme.shadows[10]
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <People sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Build Community
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card 
              sx={{ 
                height: '100%',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  boxShadow: theme.shadows[10]
                }
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    mx: 'auto',
                    mb: 2
                  }}
                >
                  <Lightbulb sx={{ fontSize: 40 }} />
                </Avatar>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  Promote Innovation
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Operation Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 6, 
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`
          }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            align="center"
            sx={{ 
              fontWeight: 700,
              mb: 6,
              color: theme.palette.text.primary,
              position: 'relative',
              '&:after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '60px',
                height: '4px',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                borderRadius: '2px'
              }
            }}
          >
            How We Operate
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .operation-icon': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    }
                  }
                }}
              >
                <Avatar 
                  className="operation-icon"
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    bgcolor: theme.palette.primary.main,
                    mb: 3,
                    boxShadow: 3,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <RocketLaunch sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: theme.palette.primary.dark,
                    mb: 2
                  }}
                >
                  Tool Discovery
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    maxWidth: '280px'
                  }}
                >
                  Actively searching for innovative AI tools that can enhance web development workflows
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .operation-icon': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    }
                  }
                }}
              >
                <Avatar 
                  className="operation-icon"
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    bgcolor: theme.palette.primary.main,
                    mb: 3,
                    boxShadow: 3,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <CheckCircle sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: theme.palette.primary.dark,
                    mb: 2
                  }}
                >
                  Quality Reviews
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    maxWidth: '280px'
                  }}
                >
                  Thorough testing and evaluation of each tool's performance and reliability
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .operation-icon': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    }
                  }
                }}
              >
                <Avatar 
                  className="operation-icon"
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    bgcolor: theme.palette.primary.main,
                    mb: 3,
                    boxShadow: 3,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Chat sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: theme.palette.primary.dark,
                    mb: 2
                  }}
                >
                  Community
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    maxWidth: '280px'
                  }}
                >
                  Building an active community for sharing experiences and best practices
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .operation-icon': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    }
                  }
                }}
              >
                <Avatar 
                  className="operation-icon"
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    bgcolor: theme.palette.primary.main,
                    mb: 3,
                    boxShadow: 3,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Sync sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: theme.palette.primary.dark,
                    mb: 2
                  }}
                >
                  Continuous Updates
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    maxWidth: '280px'
                  }}
                >
                  Regular updates with new tools and features based on community feedback
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .operation-icon': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    }
                  }
                }}
              >
                <Avatar 
                  className="operation-icon"
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    bgcolor: theme.palette.primary.main,
                    mb: 3,
                    boxShadow: 3,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Security sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: theme.palette.primary.dark,
                    mb: 2
                  }}
                >
                  Quality Assurance
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    maxWidth: '280px'
                  }}
                >
                  Ensuring all tools meet our high standards for security and reliability
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Box 
                sx={{ 
                  textAlign: 'center', 
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    '& .operation-icon': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    }
                  }
                }}
              >
                <Avatar 
                  className="operation-icon"
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    bgcolor: theme.palette.primary.main,
                    mb: 3,
                    boxShadow: 3,
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Speed sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography 
                  variant="h5" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: theme.palette.primary.dark,
                    mb: 2
                  }}
                >
                  Performance
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: theme.palette.text.secondary,
                    maxWidth: '280px'
                  }}
                >
                  Optimizing tools for maximum efficiency and developer productivity
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Join Community Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 4, 
            borderRadius: 3,
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: 'white',
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h3" 
            component="h2" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 3
            }}
          >
            Join Our Community
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: '800px', mx: 'auto', mb: 4 }}>
            Be part of our growing community of developers shaping the future of web development with AI
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Avatar sx={{ bgcolor: 'white', color: theme.palette.primary.main, width: 60, height: 60 }}>
              <Code fontSize="large" />
            </Avatar>
            <Avatar sx={{ bgcolor: 'white', color: theme.palette.primary.main, width: 60, height: 60 }}>
              <Psychology fontSize="large" />
            </Avatar>
            <Avatar sx={{ bgcolor: 'white', color: theme.palette.primary.main, width: 60, height: 60 }}>
              <Speed fontSize="large" />
            </Avatar>
            <Avatar sx={{ bgcolor: 'white', color: theme.palette.primary.main, width: 60, height: 60 }}>
              <AutoAwesome fontSize="large" />
            </Avatar>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
}

export default AboutPage; 