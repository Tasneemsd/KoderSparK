import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box, Grid, Paper, Card, CardContent } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

// You would replace this with your actual attractive background image or a dynamic service
const HERO_BACKGROUND_IMAGE = 'https://static.vecteezy.com/system/resources/thumbnails/000/448/394/small_2x/63q3_ug56_180116.jpg'; // Example: University campus

const navItems = ['Home', 'About Us', 'Academics', 'Events', 'Contact Us'];

const Home = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        EduManage
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemText primary={item} sx={{ paddingLeft: 2 }} />
          </ListItem>
        ))}
        <ListItem disablePadding>
          <Button variant="contained" color="primary" fullWidth sx={{ margin: 2 }}>
            Login
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="tw-bg-gradient-to-r tw-from-blue-700 tw-to-indigo-800 tw-shadow-lg">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} className="tw-font-bold tw-text-white">
            EduManage
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }} className="tw-hover:tw-bg-blue-600 tw-mx-1">
                {item}
              </Button>
            ))}
            <Button variant="contained" color="secondary" className="tw-ml-4 tw-px-6 tw-py-2 tw-rounded-full tw-hover:tw-bg-pink-600 tw-bg-pink-500">
              Login
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      {/* Hero Section with Background Image */}
      <Box
        className="tw-relative tw-h-96 tw-flex tw-items-center tw-justify-center tw-text-white tw-overflow-hidden"
        sx={{
          backgroundImage: `url(${HERO_BACKGROUND_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Makes background fixed on scroll
        }}
      >
        <div className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-50"></div> {/* Overlay for text readability */}
        <div className="tw-relative tw-z-10 tw-text-center tw-p-4">
          <Typography variant="h3" component="h1" className="tw-font-extrabold tw-mb-4 tw-text-shadow-lg md:tw-text-5xl">
            Empowering Minds, Shaping Futures
          </Typography>
          <Typography variant="h6" className="tw-mb-8 md:tw-text-xl">
            Your journey to knowledge begins here.
          </Typography>
          <Button variant="contained" size="large" className="tw-bg-blue-500 tw-hover:tw-bg-blue-600 tw-text-white tw-rounded-full tw-py-3 tw-px-8 tw-shadow-lg">
            Explore Courses
          </Button>
        </div>
      </Box>

      <Box component="main" sx={{ p: 3 }} className="tw-bg-gray-100 tw-min-h-screen">
        {/* Toolbar is now above the hero section, so this is not strictly needed here but kept for consistent spacing if hero changes */}
        {/* <Toolbar /> */}
        <Typography variant="h4" className="tw-text-gray-800 tw-mb-6 tw-font-semibold tw-text-center tw-mt-8">
          Welcome to Your School Dashboard!
        </Typography>

        <Grid container spacing={3} className="tw-mt-8">
          {/* Statistics Cards */}
          <Grid item xs={12} sm={6} md={3}>
            <Card className="tw-shadow-lg tw-rounded-xl tw-transform tw-transition tw-duration-300 tw-hover:tw-scale-105 tw-bg-white">
              <CardContent>
                <Typography color="textSecondary" gutterBottom className="tw-text-gray-600">
                  Total Students
                </Typography>
                <Typography variant="h5" component="div" className="tw-font-bold tw-text-blue-600">
                  1,250
                </Typography>
                <Typography color="textSecondary" className="tw-text-gray-500">
                  +10% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="tw-shadow-lg tw-rounded-xl tw-transform tw-transition tw-duration-300 tw-hover:tw-scale-105 tw-bg-white">
              <CardContent>
                <Typography color="textSecondary" gutterBottom className="tw-text-gray-600">
                  Total Teachers
                </Typography>
                <Typography variant="h5" component="div" className="tw-font-bold tw-text-green-600">
                  85
                </Typography>
                <Typography color="textSecondary" className="tw-text-gray-500">
                  +5% from last month
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="tw-shadow-lg tw-rounded-xl tw-transform tw-transition tw-duration-300 tw-hover:tw-scale-105 tw-bg-white">
              <CardContent>
                <Typography color="textSecondary" gutterBottom className="tw-text-gray-600">
                  Active Courses
                </Typography>
                <Typography variant="h5" component="div" className="tw-font-bold tw-text-purple-600">
                  45
                </Typography>
                <Typography color="textSecondary" className="tw-text-gray-500">
                  New courses added: 3
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card className="tw-shadow-lg tw-rounded-xl tw-transform tw-transition tw-duration-300 tw-hover:tw-scale-105 tw-bg-white">
              <CardContent>
                <Typography color="textSecondary" gutterBottom className="tw-text-gray-600">
                  Upcoming Events
                </Typography>
                <Typography variant="h5" component="div" className="tw-font-bold tw-text-red-600">
                  12
                </Typography>
                <Typography color="textSecondary" className="tw-text-gray-500">
                  Next event: Apr 15
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Activities / Announcements */}
          <Grid item xs={12} md={8}>
            <Paper className="tw-p-6 tw-shadow-lg tw-rounded-xl tw-bg-white">
              <Typography variant="h6" className="tw-mb-4 tw-text-gray-700 tw-font-semibold">Recent Activities</Typography>
              <List>
                <ListItem divider>
                  <ListItemText
                    primary="New student registered: John Doe"
                    secondary="2 minutes ago"
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemText
                    primary="Teacher Michael Smith updated Math curriculum"
                    secondary="1 hour ago"
                  />
                </ListItem>
                <ListItem divider>
                  <ListItemText
                    primary="New course 'Advanced Physics' added"
                    secondary="Yesterday"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Exam results for Grade 10 published"
                    secondary="2 days ago"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Quick Links / Calendar (Example) */}
          <Grid item xs={12} md={4}>
            <Paper className="tw-p-6 tw-shadow-lg tw-rounded-xl tw-bg-white">
              <Typography variant="h6" className="tw-mb-4 tw-text-gray-700 tw-font-semibold">Quick Actions</Typography>
              <div className="tw-space-y-3">
                <Button variant="contained" color="primary" fullWidth className="tw-py-3 tw-hover:tw-bg-blue-700">
                  Manage Students
                </Button>
                <Button variant="contained" color="secondary" fullWidth className="tw-py-3 tw-hover:tw-bg-green-700 tw-bg-green-500">
                  Manage Teachers
                </Button>
                <Button variant="outlined" color="primary" fullWidth className="tw-py-3 tw-hover:tw-bg-blue-50">
                  View Reports
                </Button>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;